import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaInicioComponent} from "./rutas/ruta-inicio/ruta-inicio.component";
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaGestionUsuariosComponent} from "./rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component";
import {RutaEditarUsuarioComponent} from "./rutas/ruta-editar-usuario/ruta-editar-usuario.component";
import {RutaRegistroComponent} from "./rutas/ruta-registro/ruta-registro.component";
import {RutaHomeVivoComponent} from "./rutas/ruta-home-vivo/ruta-home-vivo.component";
import {GestionHomeVivoComponent} from "./modales/gestion-home-vivo/gestion-home-vivo/gestion-home-vivo.component";
import {ModalResgistrarUsuarioComponent} from "./modales/usuario/modal-resgistrar-usuario/modal-resgistrar-usuario.component";


const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent
  },
  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: 'inicio/registro',
    component: RutaRegistroComponent
  },
  {
    path: 'inicio/registro/gestion-usuarios',
    component: RutaGestionUsuariosComponent,
    children: [
      {
        path: 'editar',
        component: ModalResgistrarUsuarioComponent
      }
    ]
  },
  {
    path: 'inicio/home-vivo',
    component: RutaHomeVivoComponent,
  },
  {
    path: 'inicio/home-vivo/gestion-home-vivo',
    component: GestionHomeVivoComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
