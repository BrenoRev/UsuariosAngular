import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule , IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPopper } from 'angular-popper';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


// Configuração pra mascara de CPF
export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPopper,
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
