import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {LightboxModule} from 'primeng/lightbox';
import {HttpClientModule} from "@angular/common/http";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalResgistrarUsuarioComponent } from './modales/usuario/modal-resgistrar-usuario/modal-resgistrar-usuario.component';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule} from "@angular/material/dialog";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaRegistroComponent } from './rutas/ruta-registro/ruta-registro.component';
import { RutaHomeVivoComponent } from './rutas/ruta-home-vivo/ruta-home-vivo.component';
import { RutaHomeHistorialComponent } from './rutas/ruta-home-historial/ruta-home-historial.component';
import { RutaHomeAlertaComponent } from './rutas/ruta-home-alerta/ruta-home-alerta.component';
import {UsuarioService} from "./modales/usuario/userServices/usuario.service";
import { RutaGestionUsuariosComponent } from './rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import { RutaEditarUsuarioComponent } from './rutas/ruta-editar-usuario/ruta-editar-usuario.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ButtonModule} from "primeng";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {WebcamModule} from 'ngx-webcam';
import { GestionHomeVivoComponent } from './modales/gestion-home-vivo/gestion-home-vivo/gestion-home-vivo.component';
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    AppComponent,
    ModalResgistrarUsuarioComponent,
    RutaLoginComponent,
    RutaRegistroComponent,
    RutaHomeVivoComponent,
    RutaHomeHistorialComponent,
    RutaHomeAlertaComponent,
    RutaGestionUsuariosComponent,
    RutaEditarUsuarioComponent,
    RutaInicioComponent,
    GestionHomeVivoComponent
  ],
  entryComponents:[
    RutaEditarUsuarioComponent,
    ModalResgistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    DialogModule,
    LightboxModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ButtonModule,
    MatGridListModule,
    MatSelectModule,
    WebcamModule,
    MatSidenavModule,
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
