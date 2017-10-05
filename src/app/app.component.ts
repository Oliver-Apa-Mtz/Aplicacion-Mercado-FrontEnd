import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';
import { GLOBAL } from './services/global';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService],
})
export class AppComponent implements OnInit {
  public title = 'Mall-E';
  public usuario: Usuario;
  public usuarioRegistro: Usuario;
  public identity: any;
  public token: any;
  public errorMessage: any = false;
  public errorAlerta: any = false;
  public url: string;
  public categorias = ['Caballero', 'Dama', 'Alimentos-Bebidas', 'Tecnologia', 'Hogar', 'Servicios', 'Otros'];
  public categoriasCaba = ['Playeras', 'Pantalones', 'Ropa interior', 'Trajes', 'Calzado', 'Accesorios-Caballero'];
  public categoriasDama = ['Blusas', 'Pantalones', 'Vestidos', 'Calzado', 'Bolsos', 'Ropa interior', 'Accesorios-Dama'];
  public categoriasAli = ['Pizzas', 'Tortas-Hamburguesas', 'Postres', 'Bebidas Preparadas', 'Otros-Alimentos'];
  public categoriasTecn = ['Computación', 'Celulares', 'Tablet', 'Audio/Video', 'Consolas-Videojuegos', 'Camaras', 'Otros-Accesorios'];
  public categoriasHoga = ['Muebles', 'Electrodomesticos', 'Camas', 'Articulos/hogar', 'Otros-Articulos'];
  public categoriasServ = ['Construcción', 'Carpinteria', 'Pintura', 'Otros-Servicios'];
  public carga: boolean;
  public pendientes: any = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario('', '', '', '', '', 'usuario', '', '', new Date(), [''], [''], [''],[''],['']);
    this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '', '', new Date(), [''], [''], [''],[''],['']);
    this.url = GLOBAL.url;
    this.carga = false;
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.pendientes = this.identity.ofertasRecibidas.length;
    this.scrollDetect();
  }
  mostrarSubCate(hijo) {
    $('#' + hijo).css({'top': '23px'});
  }
  ocultarSubCate(hijo){
    $('#' + hijo).css({'top': '-300px'});
  }
  scrollDetect(){
    var obj = $(document); // objeto sobre el que quiero detectar scroll
    var obj_top = obj.scrollTop(); // scroll vertical inicial del objeto
    obj.scroll(function(){
      var obj_act_top = $(this).scrollTop(); // obtener scroll top instantaneo
      if (obj_act_top > obj_top) {
        // scroll hacia abajo
        $('.header').css({'top': '-8vh'});
        $('.categorias').css({'top': '0vh'});
      }else {
        // scroll hacia arriba
        $('.header').removeAttr('style');
        $('.categorias').removeAttr('style');
      }
      obj_top = obj_act_top; // almacenar scroll top anterior
    });
  }

  onSubmit() {
    this._usuarioService.signup(this.usuario).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {
          //console.log('No se pudo iniciar sesion');
        }else {
          this.carga = true;
          // crear elemento en el localStorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          // conseguir el token para enviarselo a cada peticion http
          this._usuarioService.signup(this.usuario, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {
                alert('El token no se ha generado');
              }else {
                // crear elemento en el localstorage para tener el token disponible
                localStorage.setItem('token', token);
                this.usuario = new Usuario('', '', '', '', '', 'usuario', '', '', new Date(), [''], [''], [''],[''],['']);
              }
              this.pendientes = this.identity.ofertasRecibidas.length;
              this._router.navigate(['/publicaciones/']);
              this.carga = false;
            },
            error => {
              let errorMessage = error;
              if (errorMessage != null) {
                // console.log(error);
              }
            }
          );
        }
      },
      error => {
        let errorMessage = error;
        if (errorMessage != null) {
          this.errorMessage = 'Los datos introducidos son erroneos o el usuario no existe';
          setTimeout(() => {
            $('.errores').css({'opacity': '1'});
          }, 500);
          setTimeout(() => {
            $('.errores').css({ 'opacity': '0' });
          }, 4500);
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      }
    );
  }

   onSubmitRegistro() {
    this._usuarioService.register(this.usuarioRegistro).subscribe(
      response => {
        let usuario = response.usuario;
        this.usuarioRegistro = usuario;
        if (!usuario._id) {
          //console.log('Error al registrarse');
        }else {
          this.errorAlerta = `Te has registrado correctamente, inicia sesion y comienza a generar dinero!!`;
          this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '', '', new Date(), [''], [''], [''],[''],['']);
          setTimeout(() => {
            $('.errores').css({ 'opacity': '1' });
          }, 500);
          setTimeout(() => {
            $('.errores').css({ 'opacity': '0' });
          }, 4500);
          setTimeout(() => {
            this.errorAlerta = null;
          }, 5000);
        }
      },
      error => {
        let errorAlerta = error;
        if (errorAlerta != null) {
          this.errorAlerta = 'Ocurrio un error, intentelo de nuevo';
          setTimeout(() => {
            this.errorAlerta = null;
          }, 5000);
        }
      }
    );
  }

  buscar(termino) {
    if (termino.length == 0) {
      this._router.navigate(['/publicaciones']);
    }else {
      this._router.navigate(['/publicaciones-buscar/', termino]);
    }
  }

}
