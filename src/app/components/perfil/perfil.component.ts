import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jQuery: any;
declare var $: any;

import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public identity;
  public token;
  public url: string;
  public ofertas: any = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.irArriba();
    this.ofertas = this.identity.ofertasRecibidas.length;
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    window.location.reload();
  }
}
