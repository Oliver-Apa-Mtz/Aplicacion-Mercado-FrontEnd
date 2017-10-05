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
  selector: 'app-ofertas-realizadas',
  templateUrl: './ofertas-realizadas.component.html',
  styleUrls: ['../publicacion-mostrar/publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class OfertasRealizadasComponent implements OnInit {
  public ofertas: Publicacion[] = [];
  public identity: any;
  public token: any;
  public url: string;
  public vacio: boolean = true;
  public usuario: Usuario;
  public mensaje: string;

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
    this.mensaje = 'Aun no has realizado ninguna oferta a un articulo...';
  }

  ngOnInit() {
    this.obtenerOfertas();
  }


  obtenerOfertas(){
    for(let oferta of this.usuario.ofertasHechas){
      this._publicacionService.obtenerPublicacion(this.token, oferta).subscribe(
        response => {
          if(!response.publicacion){
            this._router.navigate(['/']);
          }else{
            this.ofertas.push(response.publicacion);
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
  }

  cambioImg(padre, hijo) {
    $('#' + padre + ' > img:nth-child(' + hijo + ')').css({'opacity': '1'});
    $('#' + padre + ' > img:nth-child(' + hijo + ')').siblings('img').css({'opacity': '0'});
    $('#' + padre + hijo).css({'background-color': '#263238'});
    $('#' + padre + hijo).siblings('p').css({'background-color': '#EEEEEE'});
  }

}
