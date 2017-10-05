import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-publicacion-mostrar',
  templateUrl: './publicacion-mostrar.component.html',
  styleUrls: ['./publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class PublicacionMostrarComponent implements OnInit {
  public publicaciones: Publicacion[];
  public identity: any;
  public usuario: Usuario;
  public token: any;
  public errorMsg: any;
  public url: string;
  public vacio: any = true;
  public mensaje: any;
  public ofertados: any = [];

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
    this.mensaje = `Aun no hay productos publicados, que esperas para empezar a vender ${this.identity.nombre}`;
    this.obtenerOfertados();
  }

  @ViewChild('carousel') carouselElement;
  actions = new EventEmitter<string>();
  showInitialized = false;

  ngOnInit() {
    this.obtenerPublicacionesGeneral();
  }

  cambioImg(padre, hijo) {
    $('#' + padre + ' > img:nth-child(' + hijo + ')').css({'opacity': '1'});
    $('#' + padre + ' > img:nth-child(' + hijo + ')').siblings('img').css({'opacity': '0'});
    $('#' + padre + hijo).css({'background-color': '#263238'});
    $('#' + padre + hijo).siblings('p').css({'background-color': '#EEEEEE'});
  }

  obtenerPublicacionesGeneral() {
      this._publicacionService.obtenerPublicacionesGeneral(this.token).subscribe(
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
  }

  obtenerOfertados(){
    for(let oferta of this.usuario.ofertasHechas){
      this.ofertados.push(oferta);
    }
  }

}
