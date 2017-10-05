import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterializeAction, MaterializeDirective } from "angular2-materialize"

import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { GLOBAL } from '../../services/global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-publicacion-unica',
  templateUrl: './publicacion-unica.component.html',
  styleUrls: ['./publicacion-unica.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class PublicacionMostrarUnicaComponent implements OnInit {
  public publicaciones: Publicacion[];
  public usuario: Usuario;
  public vendedor: any;
  public identity;
  public token;
  public errorMsg;
  public url:string;
  public lat: number;
  public lng: number;
  public zoom: number = 17;
  public latUsu:number;
  public lngUsu:number;
  public favorito:any;
  public activo: boolean = false;
  public autor: boolean = false;
  public ofertado: boolean = false;
  public oferta: any;
  public valorOferta: any;
  public compra: any;
  public valorCompra: any;

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
    this.usuario = this.identity;
    this.irArriba();
  }

  @ViewChild('carousel') carouselElement;
  actions = new EventEmitter<string>();
  showInitialized = false;

  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  ngOnInit() {
    //this.posicion();
    this.lat = 16.17660477761966;
    this.lng = -95.19243478775024;
    this._route.params.subscribe(params => {
      this._publicacionService.obtenerPublicacion(this.token,params['id']).subscribe(
        response => {
            if(!response.publicacion){
              this._router.navigate(['/publicaciones']);
            }else{
              this.publicaciones = response.publicacion;
              this.vendedor = this.publicaciones[0].usuario;
              if(this.usuario._id == this.publicaciones[0].usuario['_id']){
                this.autor = true;
              }
              for(let oferta of this.usuario.ofertasHechas){
                if(oferta == this.publicaciones[0]._id){
                  this.ofertado = true;
                }
              }
              for (let favorito of this.usuario.favoritos){
                if(favorito == this.publicaciones[0]._id){
                  this.activo = true;
                }
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
    });
  }
  public mostrarSubCate(hijo){
    $('#'+hijo).css({'top':'23px'})
  }
  public ocultarSubCate(hijo){
    $('#'+hijo).css({'top':'-300px'})
  }

  cambioImg(padre, hijo){
    $('#'+padre+' > img:nth-child('+hijo+')').css({'opacity':'1'});
    $('#'+padre+' > img:nth-child('+hijo+')').siblings('img').css({'opacity':'0'})
    $('#'+padre+hijo).css({'background-color':'#263238'});
    $('#'+padre+hijo).siblings('p').css({'background-color':'#EEEEEE'});
  }
  posicion(){
    navigator.geolocation.getCurrentPosition(pos => {
      this.latUsu = pos.coords.latitude;
      this.lngUsu = pos.coords.longitude;
    })
  }

  agregarFavorito(idPublicacion){
    $('span i').addClass('rebote');
    this.favorito = idPublicacion;
    if(this.activo){
      for(let i = 0; i < this.usuario.favoritos.length; i++){
        if(this.favorito == this.usuario.favoritos[i]){
          this.usuario.favoritos.splice(i,1);
        }
      }
      this._usuarioService.actualizarUsuario(this.usuario).subscribe(
        response => {
          if (!response.usuario) {
          }else {
            localStorage.setItem('identity', JSON.stringify(this.usuario));
            this.activo = false;
          }
        },
        error => {
          var errorMsg = error;
          if (errorMsg != null) {
            var body = JSON.parse(error._body);
            this.errorMsg = body.message;
          }
        }
      )
    }else{
      this.usuario.favoritos.push(this.favorito);
      this._usuarioService.actualizarUsuario(this.usuario).subscribe(
        response => {
          if (!response.usuario) {
          }else {
            localStorage.setItem('identity', JSON.stringify(this.usuario));
            this.activo = true;
          }
        },
        error => {
          var errorMsg = error;
          if (errorMsg != null) {
            var body = JSON.parse(error._body);
            this.errorMsg = body.message;
          }
        }
      )
    }
    setTimeout(() => {
      $('span i').removeClass('rebote');
    },1000)
  }

  ofertar(idPublicacion,idVendedor){
    this.oferta = idPublicacion;
    this.valorOferta = `${idPublicacion}-${idVendedor}`;

    this.usuario.ofertasHechas.push(this.oferta);
    this.vendedor.ofertasRecibidas.push(this.valorOferta);

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (!response.usuario) {
        }else {
          localStorage.setItem('identity', JSON.stringify(this.usuario));
          this.ofertado = true;
          $('.confirmacion').css({'display':'block'});
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )

    this._usuarioService.actualizarVendedor(this.vendedor).subscribe(
      response => {
        if (!response.usuario) {
        }else {
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )
  }

  compraRealizada(idPublicacion,idVendedor){
    this.compra = idPublicacion;
    this.valorCompra = `${idPublicacion}-${idVendedor}`;

    this.usuario.compras.push(this.compra);
    this.vendedor.ventas.push(this.valorCompra);
    for(let el of this.usuario.ofertasHechas){
      if(el == this.compra){
        this.usuario.ofertasHechas.splice(0,1);
      }
    }
    for(let el of this.vendedor.ofertasRecibidas){
      if(el == this.valorCompra){
        this.vendedor.ofertasRecibidas.splice(0,1);
      }
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (!response.usuario) {
        }else {
          localStorage.setItem('identity', JSON.stringify(this.usuario));
          this.ofertado = false;
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )

    this._usuarioService.actualizarVendedor(this.vendedor).subscribe(
      response => {
        if (!response.usuario) {
        }else {
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )
  }

  compraCancelada(idPublicacion, idVendedor){
    this.compra = idPublicacion;
    this.valorCompra = `${idPublicacion}-${idVendedor}`;

    for(let el of this.usuario.ofertasHechas){
      if(el == this.compra){
        this.usuario.ofertasHechas.splice(0,1);
      }
    }
    for(let el of this.vendedor.ofertasRecibidas){
      if(el == this.valorCompra){
        this.vendedor.ofertasRecibidas.splice(0,1);
      }
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (!response.usuario) {
        }else {
          localStorage.setItem('identity', JSON.stringify(this.usuario));
          this.ofertado = false;
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )

    this._usuarioService.actualizarVendedor(this.vendedor).subscribe(
      response => {
        if (!response.usuario) {
        }else {
        }
      },
      error => {
        var errorMsg = error;
        if (errorMsg != null) {
          var body = JSON.parse(error._body);
          this.errorMsg = body.message;
        }
      }
    )
  }
  cerrarModal(){
    if(this.ofertado){
      $('.confirmacion').css({'display':'none'});
    }
  }
}
