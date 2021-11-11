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
    return this.http.get(AppConstants.baseServidor + "usuario/")
  }

  deletarUsuario(id: number): Observable<any>{
    return this.http.delete(AppConstants.baseServidor + "usuario/" + id , {responseType: 'text'})
  }

  updateUsuario(usuario: any): Observable<any>{
    return this.http.put(AppConstants.baseServidor + "usuario/", usuario)
  }

  patchUsuario(usuario: any): Observable<any>{
    return this.http.patch(AppConstants.baseServidor + "usuario/patch", usuario)
  }
  
  getUsuarioId(id: number): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "usuario/" + id)
  }

  getUsuarioNome(nome: string, page: number): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "usuario/name/" + nome + "/page/" + page)
  }

  saveUsuario(usuario: any): Observable<any>{
    return this.http.post(AppConstants.baseServidor + "usuario/register", usuario)
  }

  userAutenticado(){
    if(localStorage.getItem("token") != null && localStorage.getItem("token") != undefined){
      return true;
    }else{
      return false;
    }
  }

  removerTelefone(id: number): Observable<any>{
    return this.http.delete(AppConstants.baseServidor + "usuario/removerTelefone/" + id, {responseType: 'text'})
  }

  getStudentListPage(page: number): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "usuario/page/" + page)
  }
  
  getProfissaoList(): Observable<any>{
    return this.http.get(AppConstants.baseServidor + "profissao/")
  }
}


