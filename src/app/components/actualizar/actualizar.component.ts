import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
  providers: [UsuarioService]
})
export class ActualizarComponent implements OnInit {
  public usuario: Usuario;
  public identity;
  public token;
  public errorMsg;
  public filesToUpload: Array< any >;
  public url: string;

  constructor(
    private _usuarioService: UsuarioService
  ) {

    // localStorage
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.usuario = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    //console.log('todo bien actualizar');
    this.irArriba();
  }

  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  onSubmit() {
    //console.log(this.usuario);
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (!response.usuario) {
        }else {
          // this.usuario = response.usuario;
          localStorage.setItem('identity', JSON.stringify(this.usuario));
          if (!this.filesToUpload) {
            // redireccion
            window.location.reload();
          }else {
            this.makeFileRequest(this.url + 'subir-imagen/' + this.usuario._id, [], this.filesToUpload).then(
              (result: any) => {
                this.usuario.imagen = result.imagen;
                localStorage.setItem('identity', JSON.stringify(this.usuario));
                let imagen_path = this.url + 'subir-imagen/' + this.usuario.imagen;
                window.location.reload();
              },
            );
          }
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
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<any>>fileInput.target.files;
  }

  makeFileRequest(url: any, params: Array<string>, files: Array<any>) {
    var token = this.token;
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('imagen', files[i], files[i].name);
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
