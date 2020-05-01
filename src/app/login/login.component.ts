import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  //providers:[AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  //form
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  submit: boolean = false;

  //acessar os controler na view
  get controls() { return this.form.controls; }

  onSubmit(){
    this.submit = true;

    if(this.form.invalid){
      return;
    }

    this.auth.login('api/login', this.form.value).subscribe( async data=>{
      if(data.success){
        //salvando dados para sessão
        localStorage.setItem("username", data.user.userName);
        localStorage.setItem('password', data.user.password);
        await this.router.navigate(['/product']);
        location.reload();
      }
    })
  }
  ngOnInit(): void { }

}
