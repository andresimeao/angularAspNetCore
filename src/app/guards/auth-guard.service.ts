import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  private isAuthenticate: boolean = false;

  canActivate() {
    const username =  localStorage.getItem("username");
    const password =  localStorage.getItem("password");

    if(username !== null && password !== null ){
      this.isAuthenticate = true;
    }

    if(this.isAuthenticate){
      return this.isAuthenticate;
    }else{
      alert('usuario nao authenticado');
      this.router.navigate(['login']);
      return this.isAuthenticate;
    }
  }
}
