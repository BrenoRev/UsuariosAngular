import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';



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
        return next.handle(tokenRequest);
      }else{
        // Se não, manda a requisição original
        return next.handle(req);
      }
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
