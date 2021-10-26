import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
  getStudentList(): Observable<any>{
    console.log(AppConstants.baseServidor + "usuario/")
    return this.http.get(AppConstants.baseServidor + "usuario/")
  }

  deletarUsuario(id: number): Observable<any>{
    return this.http.delete(AppConstants.baseServidor + "usuario/" + id , {responseType: 'text'})
  }

  updateUsuario(id: number, usuario: any): Observable<any>{
    return this.http.put(AppConstants.baseServidor + "usuario/" + id, usuario)
  }

  getUsuarioId(id: number): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "usuario/" + id)
  }

  getUsuarioNome(nome: string): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "usuario/name/" + nome)
  }


  

}


