import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publicacion } from '../models/publicacion';

@Injectable()
export class PublicacionService{
  public url: string;

  constructor(
    private _http: Http
  ){
  	this.url = GLOBAL.url;
  }

  guardarPublicacion(token, publicacion: Publicacion){
    let json = JSON.stringify(publicacion);
    let params = json;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'guardar-publicacion',params, {headers:headers})
                     .map(res => res.json());
  }

  obtenerPublicacion(token,id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'publicacion/'+id,options)
                     .map(res => res.json());
  }

  actualizarPublicacion(token,id:any,publicacion:Publicacion){
    let json = JSON.stringify(publicacion);
    let params = json;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.put(this.url+'actualizar-publicacion/'+id,params,{headers: headers})
                     .map(res => res.json());
  }

  obtenerPublicacionesGeneral(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
  let options = new RequestOptions({headers: headers});
  return this._http.get(this.url+'publicaciones',options)
                   .map(res => res.json());
  }

	obtenerPublicacionCategoria(token,categoria){
		let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'publicaciones-cate/'+categoria,options)
                     .map(res => res.json());
  }

  obtenerPublicacionSubcategoria(token,subcategoria){
		let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'publicaciones-sub/'+subcategoria,options)
                     .map(res => res.json());
	}

  obtenerPublicacionesBuscar(token,termino){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'publicaciones-buscar/'+termino,options)
                     .map(res => res.json());
  }

  obtenerPublicacionesUsuario(token, id){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'publicaciones/'+id, options)
                     .map(res => res.json());
  }
}
