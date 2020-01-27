import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../userServices/usuario.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {Users} from "../userInterface/user";
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-resgistrar-usuario',
  templateUrl: './modal-resgistrar-usuario.component.html',
  styleUrls: ['./modal-resgistrar-usuario.component.scss']
})
export class ModalResgistrarUsuarioComponent {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  imageUrl: any = 'https://firebasestorage.googleapis.com/v0/b/jema-dental.appspot.com/o/imageOdontProfile%2Fuserphoto.png?alt=media&token=79e54081-7486-41ec-b380-e3ff34def585';
  private imagen: any;
  userForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    confirmar: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    telefono: new FormControl(''),
    imagen: new FormControl(''),

  });


  constructor(private toastr: ToastrService,
              public userService: UsuarioService,
  ) {

  }

  ngOnInit() {
    this.userForm.get('nombre').setValue(this.userService.userSelected.nombre);
    this.userForm.get('apellido').setValue(this.userService.userSelected.apellido);
    this.userForm.get('confirmar').setValue(this.userService.userSelected.confirmar);
    this.userForm.get('contrasena').setValue(this.userService.userSelected.contrasena);
    this.userForm.get('email').setValue(this.userService.userSelected.email);
    this.userForm.get('telefono').setValue(this.userService.userSelected.telefono);
    this.userForm.get('imagen').setValue(this.userService.userSelected.imagen);
    this.imagen = this.imageUrl;
  }

  onSaveUser(data: Users) {
    data.nombre = data.nombre.toUpperCase();

    if (this.existUser(data.nombre) === true && this.existUser(data.nombre) !== undefined) {
      this.userForm = new FormGroup({
        nombre: new FormControl()
      });
      this.toastr.success('Registro ya se encuentra registrado');
    } else {
      this.userService.addUser(data);
      this.toastr.warning('usuario registrado con exito');
      this.close();
    }
  }

  existUser(nombre: any): boolean {
    let exist = false;
    if (nombre) {
      const userFilter = this.userService.arrayUser.find(
        userFilterName => userFilterName.nombre === nombre);
      if (userFilter) {
        exist = true;
      } else {
        exist = false;
      }
      return exist;
    }
  }

  close(): void {
    console.log('cerrar');
    // this.dialogRef.close();

  }
  uploadFile(event: any) {
    const reader = new FileReader(); // HTML5 FileReader API
    this.imagen = event.target.files[0];
    reader.readAsDataURL(this.imagen);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
  aceptar() {
    /*this.dialogRef
      .close({
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        telefono: this.telefono,
        contrasena: this.contrasena,
        confirmar: this.confirmar,
        imagen: this.imagen
      })*/
  }

  msgValidateNombre() {
    return this.userForm.get('nombre').hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateEmail () {
    return this.userForm.get('email').hasError('pattern') ? 'Correo electrónico invalido' :
      this.userForm.get('email').hasError('required') ? '' :
        '';
  }
}

