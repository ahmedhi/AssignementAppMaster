import { Injectable } from '@angular/core';
import { isUndefined } from 'util';
import { User } from '../assignments/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loggedIn = false;
  static user : User;


  constructor() { }

  static logIn(userLogged:User) {
    // ici par exemple, on devrait prendre en parametre un login et un password
    // et vérifier qu'ils sont valables (par ex en interrogeant une BD ou un service distant)
    this.loggedIn = true;
    this.user = userLogged;
   }

  static logOut() {
    this.loggedIn = false;
    this.user = new User();
  }

  static isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn)
    });
  };
}
