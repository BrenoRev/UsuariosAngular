import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Verificar se existe a token e mandar no header da requisição pro back-end
      if(localStorage.getItem('token') !== null){
        const token = 'Bearer ' + localStorage.getItem('token');

        // Altera a requisição padrão do angular e coloca no header um authorization com a token
        const tokenRequest = req.clone({
          headers : req.headers.set('Authorization', token)
        });
        
        // Se existir manda a autorização com a token
        return next.handle(tokenRequest).pipe(
          tap((event: HttpEvent<any>) => {
            if(event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
              //alert('Sucesso: ' + event.status);
            }
          }),catchError(this.processaError))
      }else{
        // Se não, manda a requisição original
        return next.handle(req).pipe(catchError(this.processaError));
      }
  }
  
  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro Desconhecido';

    if(error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    }
    else if(error.status === 403){
      errorMessage = "Acesso expirado, faça o login novamente."
    }else{
      errorMessage = `Código: ${error.error.code == undefined ? '000' : error.error.code } , Mensagem: ${error.error.message == undefined ? "Erro Desconhecido" : error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}
@NgModule({
  providers : [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true
  },
  ],
})

export class HttpInterceptorModule {

}
