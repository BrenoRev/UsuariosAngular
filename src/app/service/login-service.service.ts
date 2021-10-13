import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(usuario: any){
    return this.http.post<any>(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data =>{
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]

      // Salvando a token recebida da api no localstorage
      localStorage.setItem("token", token)

      console.info("Token: " + localStorage.getItem("token"))
    })
  }

}
