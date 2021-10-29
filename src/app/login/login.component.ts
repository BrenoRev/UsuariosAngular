import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Application';

  blabla = {login: '', senha: ''};

  constructor(private loginService: LoginServiceService,
              private route: Router){

  }
  public login(){
    console.log(this.blabla)
    this.loginService.login(this.blabla)
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null && localStorage.getItem('token')!.toString().trim() != null){
      this.route.navigate(['/home']);
    }
  }
}
