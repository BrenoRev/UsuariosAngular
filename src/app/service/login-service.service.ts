import { UsuarioDTO } from './../model/usuario-dto';
import { User } from 'src/app/model/user';
import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient,
             private router: Router) { }

  login(usuario: any){
    this.http.post<any>(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data =>{
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]

      // Salvando a token recebida da api no localstorage
      localStorage.setItem("token", token)

      console.info("Token: " + localStorage.getItem("token"))
      this.router.navigate(['/home'])
    }, error => {
      alert("Acesso negado, credenciais não foram aceitas")
    })
  }

  loggedIn(){
    return !!localStorage.getItem("token")
  }

  recuperar(email: string){
    let user = new UsuarioDTO();
    user.email = email

    this.http.post<any>(AppConstants.baseServidor + "recuperar/", user).subscribe(data =>{
      alert(JSON.parse(JSON.stringify(data)).error)
    }, error => {
      alert("Erro ao recuperar login")
    })
  }
}
