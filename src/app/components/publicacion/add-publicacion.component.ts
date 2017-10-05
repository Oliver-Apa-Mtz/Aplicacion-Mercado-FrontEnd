import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-add-publicacion',
  templateUrl: './add-publicacion.component.html',
  styleUrls: ['./add-publicacion.component.css'],
  providers: [UsuarioService, PublicacionService]
})

export class AddPublicacionComponent implements OnInit{
  public titulo;
  public usuario: Usuario;
  public publicacion: Publicacion;
  public identity;
  public token;
  public errorMsg;
  public url: string;
  public valEstado;
  public categorias = ['Caballero', 'Dama', 'Alimentos-Bebidas', 'Tecnologia', 'Hogar', 'Servicios', 'Otros'];
  public categoriasCaba = ['Playeras', 'Pantalones', 'Ropa interior', 'Trajes', 'Calzado', 'Accesorios-Caballero'];
  public categoriasDama = ['Blusas', 'Pantalones', 'Vestidos', 'Calzado', 'Bolsos', 'Ropa interior', 'Accesorios-Dama'];
  public categoriasAli = ['Pizzas', 'Tortas/Hamburguesas', 'Postres', 'Bebidas Preparadas', 'Otros'];
  public categoriasTecn = ['Computación', 'Celulares', 'Tablet', 'Audio/Video', 'Consolas/Videojuegos', 'Camaras', 'Otros'];
  public categoriasHoga = ['Muebles', 'Electrodomesticos', 'Camas', 'Articulos/hogar', 'Otros'];
  public categoriasServ = ['Construcción', 'Carpinteria', 'Pintura', 'Otros'];
  public ahora = moment().format('LL');
  public lat: number;
  public lng: number;
  public zoom: number = 17;
  public isEdit: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService
  ){
    this.titulo = 'Agregar Publicación';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.usuario = this.identity;
    this.url = GLOBAL.url;
    this.publicacion = new Publicacion('', '', '', '', this.ahora, '', '', '', '', this.identity._id, '', '', '', 0, 0);
  }

  ngOnInit() {
    this.irArriba();
    $('select').material_select();

    $('#descripcion').val('');
    $('#descripcion').trigger('autoresize');
    this.lat = 16.17660477761966;
    this.lng = -95.19243478775024;

    $(window).scroll(function() {

    });
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  colocarMarcador($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  onSubmit() {
    this.valEstado ? this.publicacion.estado = 'Nuevo' : this.publicacion.estado = 'Usado';
    this.publicacion.entregaLat = this.lat;
    this.publicacion.entregaLng = this.lng;
    this._publicacionService.guardarPublicacion(this.token, this.publicacion).subscribe(
      response => {
        if (!response.publicacion) {
          this.errorMsg = 'Error en el servidor';
        }else {
          this.publicacion = response.publicacion;
          this._router.navigate(['/actualizar-publicacion/' + this.publicacion._id]);
        }
      },
      error => {
        var error = <any>error;
        if (error != null) {
          var body =  JSON.parse(error._body);
        }
      }
    );
  }
}
