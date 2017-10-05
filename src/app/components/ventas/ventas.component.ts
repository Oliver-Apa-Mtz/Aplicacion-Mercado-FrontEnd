import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var JQuery: any;
declare var $: any;
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['../publicacion-mostrar/publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class VentasComponent implements OnInit {
  public identity: any;
  public token: any;
  public ofertas: any = [];
  public url: string;
  public usuario: Usuario;
  public vacio: boolean = true;
  public mensaje: string;
  public vistaPropietario: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.usuario = this.identity;
    this.mensaje = 'Aun no has realizado ninguna venta en la plataforma...';
  }

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas(){
    for(let venta of this.usuario.ventas){
      let ventaCompleto = venta.split('-');
      let ventaPubli = ventaCompleto[0];
      let ventaUsu = ventaCompleto[1];
      let conjuntoVenta = [];
      this._publicacionService.obtenerPublicacion(this.token, ventaPubli).subscribe(
        response => {
          if(!response.publicacion){
            this._router.navigate(['/']);
          }else{
            conjuntoVenta.push(response.publicacion);
            this._usuarioService.obtenerVendedor(ventaUsu).subscribe(
              response => {
                if(!response.usuario){
                  this._router.navigate(['/']);
                }else{
                  conjuntoVenta.push(response.usuario);
                  this.ofertas.push(conjuntoVenta);
                  if(this.ofertas.length > 0){
                    this.vacio = false;
                  }
                }
              },
              error => {
                var error = <any>error;
                if(error != null){
                  var body =  JSON.parse(error._body);
                }
              }
            )
          }
        },
        error => {
          var error = <any>error;
          if(error != null){
            var body =  JSON.parse(error._body);
          }
        }
      )
    }
  }

}
