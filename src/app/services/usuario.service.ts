import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UsuarioService {
    public url: string;
    public identity: string;
    public token: string;
    constructor(
        private _http: Http
    ) {
        this.url = GLOBAL.url;
    }

  signup(usuario_login: any, gethash: any = null) {
    if (gethash != null) {
      usuario_login.gethash = gethash;
    }
    let json = JSON.stringify(usuario_login);
    let parametros = json;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'login', parametros, {headers: headers})
                     .map(res => res.json());
    }

  register(user_to_register: any) {
    let json = JSON.stringify(user_to_register);
    let params = json;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'registro', params, {headers: headers})
                     .map(res => res.json());
    }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefined') {
      this.identity = identity;
    }else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    }else {
      this.token = null;
    }
    return this.token;
  }

  actualizarUsuario(usuarioActu) {
    let json = JSON.stringify(usuarioActu);
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this._http.put(this.url + 'actualizar/' + usuarioActu._id, params, {headers: headers})
                     .map(res => res.json());
  }

  actualizarVendedor(vendedorActu){
    let json = JSON.stringify(vendedorActu);
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.put(this.url + 'actualizar-vendedor/' + vendedorActu._id, params, {headers: headers})
                     .map(res => res.json());
  }

  obtenerVendedor(idVendedor){
    return this._http.get(this.url+'obtener-vendedor/'+idVendedor)
                     .map(res => res.json());
  }
}
