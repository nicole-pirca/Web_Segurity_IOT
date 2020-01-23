import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {LightboxModule} from 'primeng/lightbox';
// import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms'; // ver bien
import { ModalResgistrarUsuarioComponent } from './modales/usuario/modal-resgistrar-usuario/modal-resgistrar-usuario.component';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ModalResgistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    DialogModule,
    LightboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    /*Validators,
    FormControl,FormGroup,FormBuilder*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
