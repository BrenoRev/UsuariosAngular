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

  usuario = {login: '', senha: ''};

  usuarioDTO = {email: ''}



  constructor(private loginService: LoginServiceService,
              private route: Router){

  }
  public login(){
    console.log(this.usuario)
    this.loginService.login(this.usuario)
  }

  public recuperar(){
    this.loginService.recuperar(this.usuarioDTO.email)
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null && localStorage.getItem('token')!.toString().trim() != null){
      this.route.navigate(['/home']);
    }
  }
}
