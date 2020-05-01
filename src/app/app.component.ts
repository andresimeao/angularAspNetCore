import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sitemercado';
  public user:string
  public isAuthentication:boolean = false;

  constructor(private router:Router){
    this.user = localStorage.getItem('username');
    if(this.user != null){
      this.isAuthentication = true;
    }
  }

  async logOut(){
     localStorage.removeItem('username');
     localStorage.removeItem('password');
    location.reload();
    await this.router.navigate(['login']);
  }
}
