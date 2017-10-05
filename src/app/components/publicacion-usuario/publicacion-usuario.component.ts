import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-publicacion-usuario',
  templateUrl: './publicacion-usuario.component.html',
  styleUrls: ['../publicacion-mostrar/publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class PublicacionUsuarioComponent implements OnInit {
  public publicaciones: Publicacion[];
  public identity;
  public token;
  public errorMsg;
  public url: string;
  public vacio: any = true;
  public propietario: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService
  ) {

    // localStorage
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.irArriba();
    this.obtenerPublicacionesUsuario();
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  cambioImg(padre, hijo) {
    $('#' + padre + ' > img:nth-child(' + hijo + ')').css({'opacity': '1'});
    $('#' + padre + ' > img:nth-child(' + hijo + ')').siblings('img').css({'opacity': '0'});
    $('#' + padre + hijo).css({'background-color': '#263238'});
    $('#' + padre + hijo).siblings('p').css({'background-color': '#EEEEEE'});
  }

  obtenerPublicacionesUsuario() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      if(id == this.identity._id){
        this.propietario = true;
      }
      this._publicacionService.obtenerPublicacionesUsuario(this.token, id).subscribe(
        response => {
          if (!response.publicaciones) {
            this._router.navigate(['/']);
          }else {
            this.publicaciones = response.publicaciones;
            if (this.publicaciones.length > 0) {
              this.vacio = false;
            }
          }
        },
        error => {
          var error = <any>error;
          if (error != null) {
          var body =  JSON.parse(error._body);
          }
        }
      );
    });
  }
}
