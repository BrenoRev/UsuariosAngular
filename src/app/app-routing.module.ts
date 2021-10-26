import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarioList',
    component: UsuarioComponent
  },
  {
    path: 'usuarioAdd',
    component: HomeComponent
  }, 
  {
    path: 'usuarioAdd/:id',
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
