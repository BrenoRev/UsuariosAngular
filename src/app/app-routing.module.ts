import { GuardiaoGuard } from './service/guardiao.guard';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';



const routes: Routes = [
  {
    path: 'home', canActivate: [GuardiaoGuard],
    component: HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'usuarioList', canActivate: [GuardiaoGuard],
    component: UsuarioComponent
  },
  {
    path: 'usuarioAdd', canActivate: [GuardiaoGuard],
    component: HomeComponent
  }, 
  {
    path: 'usuarioAdd/:id', canActivate: [GuardiaoGuard],
    component: UsuarioAddComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
