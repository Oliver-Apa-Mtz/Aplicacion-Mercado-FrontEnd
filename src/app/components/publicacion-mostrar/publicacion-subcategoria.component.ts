import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterializeAction} from "angular2-materialize"

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-publicacion-subcategoria',
  templateUrl: './publicacion-mostrar.component.html',
  styleUrls: ['./publicacion-mostrar.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class PublicacionMostrarSubcategoriaComponent implements OnInit {
  public publicaciones: Publicacion[];
  public identity;
  public token;
  public errorMsg;
  public url:string;
  public filtro;
  public lat: number;
  public lng: number;
  public zoom: number = 17;
  public categorias = ['Caballero','Dama','Alimentos-Bebidas','Tecnologia','Hogar','Servicios','Otros'];
  public categoriasCaba = ['Playeras','Pantalones','Ropa interior','Trajes','Calzado','Accesorios-Caballero'];
  public categoriasDama = ['Blusas','Pantalones','Vestidos','Calzado','Bolsos','Ropa interior','Accesorios-Dama'];
  public categoriasAli = ['Pizzas','Tortas-Hamburguesas','Postres','Bebidas Preparadas','Otros-Alimentos'];
  public categoriasTecn = ['Computación','Celulares','Tablet','Audio/Video','Consolas-Videojuegos','Camaras','Otros-Accesorios'];
  public categoriasHoga = ['Muebles','Electrodomesticos','Camas','Articulos/hogar','Otros-Articulos'];
  public categoriasServ = ['Construcción','Carpinteria','Pintura','Otros-Servicios'];
  public vacio: any = true;
  public mensaje: any = 'Aun no hay publicaciones para esta subcategoria';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService
  ){

    //localStorage
  	this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
  }

  @ViewChild('carousel') carouselElement;
  actions = new EventEmitter<string>();
  showInitialized = false;

  ngOnInit() {
    this.irArriba();
    this.lat = 16.17660477761966;
    this.lng = -95.19243478775024;
    this._route.params.subscribe(params => {
      this._publicacionService.obtenerPublicacionSubcategoria(this.token,params['subcategoria']).subscribe(
        response => {
            if(!response.publicaciones){
            }else{
              this.publicaciones = response.publicaciones;
              if (this.publicaciones.length > 0) {
                this.vacio = false;
              }
            }
          },
          error => {
            var error = <any>error;
            if(error != null){
              var body =  JSON.parse(error._body);
              console.log(error);
            }
          }
      )
    });
  }
  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  mostrarSubCate(hijo){
    $('#'+hijo).css({'top':'23px'})
  }
  ocultarSubCate(hijo){
    $('#'+hijo).css({'top':'-300px'})
  }

  cambioImg(padre, hijo){
    $('#'+padre+' > img:nth-child('+hijo+')').css({'opacity':'1'});
    $('#'+padre+' > img:nth-child('+hijo+')').siblings('img').css({'opacity':'0'})
    $('#'+padre+hijo).css({'background-color':'#263238'});
    $('#'+padre+hijo).siblings('p').css({'background-color':'#EEEEEE'});
  }
}
