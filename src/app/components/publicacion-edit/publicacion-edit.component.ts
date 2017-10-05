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
  selector: 'app-publicacion-edit',
  templateUrl: '../publicacion/add-publicacion.component.html',
  styleUrls: ['../publicacion/add-publicacion.component.css'],
  providers: [UsuarioService, PublicacionService]
})

export class PublicacionEditComponent implements OnInit {
  public usuario: Usuario;
  public publicacion: Publicacion;
  public identity;
  public token;
  public errorMsg;
  public url: string;
  public valEstado;
  public categorias = ['Caballero', 'Dama', 'Alimentos/Bebidas', 'Tecnologia', 'Hogar', 'Servicios', 'Otros'];
  public categoriasCaba = ['Playeras', 'Pantalones', 'Ropa interior', 'Trajes', 'Calzado', 'Accesorios'];
  public categoriasDama = ['Blusas', 'Pantalones', 'Vestidos', 'Calzado', 'Bolsos', 'Ropa interior', 'Accesorios'];
  public categoriasAli = ['Pizzas', 'Tortas/Hamburguesas', 'Postres', 'Bebidas Preparadas', 'Otros'];
  public categoriasTecn = ['Computación', 'Celulares', 'Tablet', 'Audio/Video', 'Consolas/Videojuegos', 'Camaras', 'Otros'];
  public categoriasHoga = ['Muebles', 'Electrodomesticos', 'Camas', 'Articulos/hogar', 'Otros'];
  public categoriasServ = ['Construcción', 'Carpinteria', 'Pintura', 'Otros'];
  public ahora = moment().format('LL');
  public lat: number;
  public lng: number;
  public zoom: number = 17;
  public imgPri: Array<any>;
  public imgSec: Array<any>;
  public imgTer: Array<any>;
  public isEdit: any;
  public idPubli: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.usuario = this.identity;
    this.url = GLOBAL.url;
    this.publicacion = new Publicacion('', '', '', '', this.ahora, '', '', '', '', this.identity._id, '', '', '', 0, 0);
    this.isEdit = true;
    this.lat = 16.17660477761966;
    this.lng = -95.19243478775024;
  }

  ngOnInit() {
    this.irArriba();
    this.obtenerPublicacion();

    $('select').material_select();
    $('#descripcion').val('');
    $('#descripcion').trigger('autoresize');
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  obtenerPublicacion() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this.idPubli = id;

      this._publicacionService.obtenerPublicacion(this.token, id).subscribe(
        response => {
          if (!response.publicacion) {
            this._router.navigate(['/']);
          }else {
            this.publicacion = response.publicacion;
          }
        },
        error => {
          var errorMsg = error;
          if (errorMsg != null) {
            var body = JSON.parse(error._body);
            this.errorMsg = body.message;
          }
        }
      );
    });
  }

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._publicacionService.actualizarPublicacion(this.token, id, this.publicacion).subscribe(
        response => {
          if (!response.publicacionActualizada) {
            this.errorMsg = 'Error en el servidor';
          }else {
            if (!this.imgPri || !this.imgSec || !this.imgTer) {
            }else {
              this.makeFileRequest(this.url + 'subir-imagen-publi/' + this.idPubli, [], this.imgPri, this.imgSec, this.imgTer).then(
                (result: any) => {
                  this.publicacion.imgPri = result.imgPri;
                  this.publicacion.imgSec = result.imgSec;
                  this.publicacion.imgTer = result.imgTer;
                  this.publicacion = result.publicacion;
                  // let imgPri_path = this.url + 'subir-imagen-publi/' + this.publicacion.imgPri;
                }
              )
            }
            this.publicacion = response.publicacion;
            this._router.navigate(['./publicaciones']);
            setTimeout(() => {
              window.location.reload();
            }, 500)
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
  priChangeEvent(fileInput: any) {
    this.imgPri = <Array<any>>fileInput.target.files;
  }
  secChangeEvent(fileInput: any) {
    this.imgSec = <Array<any>>fileInput.target.files;
  }
  terChangeEvent(fileInput: any) {
    this.imgTer = <Array<any>>fileInput.target.files;
  }
  makeFileRequest(url: any, params: Array<string>, fileimgPri: Array<File>, fileimgSec: Array<File>, fileimgTer: Array<File>) {
    var token = this.token;
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < fileimgPri.length; i++) {
        formData.append('imgPri', fileimgPri[i], fileimgPri[i].name);
      }
      for (var i = 0; i < fileimgSec.length; i++) {
        formData.append('imgSec', fileimgSec[i], fileimgSec[i].name);
      }
      for (var i = 0; i < fileimgTer.length; i++) {
        formData.append('imgTer', fileimgTer[i], fileimgTer[i].name);
      }

      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          }else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
