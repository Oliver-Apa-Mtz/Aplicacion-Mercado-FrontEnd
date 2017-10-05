import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { AddPublicacionComponent } from './components/publicacion/add-publicacion.component';
import { PublicacionEditComponent } from './components/publicacion-edit/publicacion-edit.component';
import { PublicacionMostrarComponent } from './components/publicacion-mostrar/publicacion-mostrar.component';
import { PublicacionMostrarCategoriaComponent } from './components/publicacion-mostrar/publicacion-categoria.component';
import { PublicacionMostrarSubcategoriaComponent } from './components/publicacion-mostrar/publicacion-subcategoria.component';
import { PublicacionMostrarBuscarComponent } from './components/publicacion-mostrar/publicacion-buscar.component';
import { PublicacionMostrarUnicaComponent } from './components/publicacion-mostrar/publicacion-unica.component';
import { PublicacionUsuarioComponent } from './components/publicacion-usuario/publicacion-usuario.component';
import { ErrorComponent } from './components/error/error.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { OfertasRealizadasComponent } from './components/ofertas-realizadas/ofertas-realizadas.component';
import { OfertasRecibidasComponent } from './components/ofertas-recibidas/ofertas-recibidas.component';
import { ComprasComponent } from './components/compras/compras.component';
import { VentasComponent } from './components/ventas/ventas.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterializeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtFJy2Z9yWidC1EKOKIqKE-LqM-V9KdTE'
    })
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    ActualizarComponent,
    AddPublicacionComponent,
    PublicacionEditComponent,
    PublicacionMostrarComponent,
    PublicacionMostrarCategoriaComponent,
    PublicacionMostrarSubcategoriaComponent,
    PublicacionMostrarBuscarComponent,
    PublicacionMostrarUnicaComponent,
    PublicacionUsuarioComponent,
    ErrorComponent,
    AyudaComponent,
    PerfilComponent,
    FavoritosComponent,
    OfertasRealizadasComponent,
    OfertasRecibidasComponent,
    ComprasComponent,
    VentasComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
