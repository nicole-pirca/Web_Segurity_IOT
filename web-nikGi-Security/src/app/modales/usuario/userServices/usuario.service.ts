import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Users} from "../userInterface/user";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.url +'/usuario';

private userCollection: AngularFirestoreCollection<Users>;
private Usuario: Observable<Users[]>;

 public userSelected: Users = {};
public isEdit: boolean;
arrayUser = [];
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {

    this.userCollection = afs.collection<Users>('Usuarios',  ref => ref.orderBy('nombre', 'asc'));
    this.Usuario = this.userCollection.valueChanges();
    this.Usuario.subscribe(list=>{
      this.arrayUser = list.map(items=> {
        return {
          id: items.id,
          nombre: items.nombre,
          apellido: items.apellido,
          telefono: items.telefono,
          email: items.email,
          contrasena: items.contrasena,
          confirmar: items.confirmar,
          imagen: items.imagen
        };
      });
    });
  }

  editar(usuario: Users) {
    const urlEditar = this.url + '/';
    console.log(urlEditar);
    return this._httpClient.
      put(urlEditar,usuario);
  }


addUser(usuario: Users) {

    return this.userCollection.add(usuario);
}
updateUser(usuario: Users) {
    return this.userCollection.doc(usuario.nombre).update(usuario);
}
}
