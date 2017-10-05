import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['../publicacion-mostrar/publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class FavoritosComponent implements OnInit {
  public publicaciones: Publicacion[];
  public favoritos:Publicacion[] = [];
  public identity: any;
  public usuario: Usuario;
  public token: any;
  public errorMsg: any;
  public url: string;
  public vacio: any = true;
  public mensaje: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService
  ) {
    // localStorage
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.usuario = this.identity;
    this.url = GLOBAL.url;
    this.mensaje = `Aun no has agregado ninguna publicación a tus favoritos`;
  }

  ngOnInit() {
    this.irArriba();
    this.obtenerFavoritos();
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  obtenerFavoritos(){
    for(let favorito of this.usuario.favoritos) {
      this._publicacionService.obtenerPublicacion(this.token,favorito).subscribe(
        response => {
          if(!response.publicacion) {
            this._router.navigate(['/publicaciones']);
          }else {
            this.favoritos.push(response.publicacion);
            if (this.favoritos.length > 0) {
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
