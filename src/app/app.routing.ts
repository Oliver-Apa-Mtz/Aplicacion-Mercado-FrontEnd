import { Routes, RouterModule } from '@angular/router';

import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { AppComponent } from './app.component';

// import publicacion
import { AddPublicacionComponent } from './components/publicacion/add-publicacion.component';
import { PublicacionEditComponent } from './components/publicacion-edit/publicacion-edit.component';
import { PublicacionMostrarComponent } from './components/publicacion-mostrar/publicacion-mostrar.component';
import { PublicacionMostrarCategoriaComponent } from './components/publicacion-mostrar/publicacion-categoria.component';
import { PublicacionMostrarSubcategoriaComponent } from './components/publicacion-mostrar/publicacion-subcategoria.component';
import { PublicacionMostrarBuscarComponent } from './components/publicacion-mostrar/publicacion-buscar.component';
import { PublicacionMostrarUnicaComponent } from './components/publicacion-mostrar/publicacion-unica.component';
import { PublicacionUsuarioComponent } from './components/publicacion-usuario/publicacion-usuario.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { OfertasRealizadasComponent } from './components/ofertas-realizadas/ofertas-realizadas.component';
import { OfertasRecibidasComponent } from './components/ofertas-recibidas/ofertas-recibidas.component';
import { ComprasComponent } from './components/compras/compras.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

// 404
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'publicaciones'},
    {path: 'publicaciones', component: PublicacionMostrarComponent},
    {path: 'publicaciones/:id', component: PublicacionUsuarioComponent},
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'ofertas-realizadas', component: OfertasRealizadasComponent},
    {path: 'ofertas-recibidas', component: OfertasRecibidasComponent},
    {path: 'compras', component: ComprasComponent},
    {path: 'ventas', component: VentasComponent},
    {path: 'publicaciones-categoria/:categoria', component: PublicacionMostrarCategoriaComponent},
    {path: 'publicaciones-subcategoria/:subcategoria', component: PublicacionMostrarSubcategoriaComponent},
    {path: 'publicaciones-buscar/:termino', component: PublicacionMostrarBuscarComponent},
    {path: 'publicacion/:id', component: PublicacionMostrarUnicaComponent},
    {path: 'datos', component: ActualizarComponent},
    {path: 'guardar-publicacion', component: AddPublicacionComponent},
    {path: 'actualizar-publicacion/:id', component: PublicacionEditComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: '**', component: ErrorComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
