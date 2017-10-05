import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-ofertas-recibidas',
  templateUrl: './ofertas-recibidas.component.html',
  styleUrls: ['../publicacion-mostrar/publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class OfertasRecibidasComponent implements OnInit {

  public ofertas = [];
  public identity: any;
  public token: any;
  public url: string;
  public vacio: boolean = true;
  public usuario: Usuario;
  public mensaje: string;
  public vistaPropietario: boolean = true;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usuarioService:UsuarioService,
    private _publicacionService:PublicacionService
  ) {
    this.identity = _usuarioService.getIdentity();
    this.token = _usuarioService.getToken();
    this.usuario = this.identity;
    this.url = GLOBAL.url;
    this.mensaje = 'Aun no has recibido ninguna oferta de tus articulos...';
  }

  ngOnInit() {
    this.obtenerOfertas();
  }

  obtenerOfertas(){
    for(let oferta of this.usuario.ofertasRecibidas){
      let ofertaCompleto = oferta.split('-');
      let ofertaPubli = ofertaCompleto[0];
      let ofertaUsu = ofertaCompleto[1];
      let conjuntoOferta = [];
      this._publicacionService.obtenerPublicacion(this.token, ofertaPubli).subscribe(
        response => {
          if(!response.publicacion){
            this._router.navigate(['/']);
          }else{
            conjuntoOferta.push(response.publicacion);
            this._usuarioService.obtenerVendedor(ofertaUsu).subscribe(
              response => {
                if(!response.usuario){
                  this._router.navigate(['/']);
                }else{
                  conjuntoOferta.push(response.usuario);
                  this.ofertas.push(conjuntoOferta);
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

  cambioImg(padre, hijo) {
    $('#' + padre + ' > img:nth-child(' + hijo + ')').css({'opacity': '1'});
    $('#' + padre + ' > img:nth-child(' + hijo + ')').siblings('img').css({'opacity': '0'});
    $('#' + padre + hijo).css({'background-color': '#263238'});
    $('#' + padre + hijo).siblings('p').css({'background-color': '#EEEEEE'});
  }

}
