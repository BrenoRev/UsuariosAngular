import { LoginServiceService } from './service/login-service.service';
import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Application';

  usuario = {login: '', senha: ''};

  constructor(private loginService: LoginServiceService){

  }
  public login(){
    this.loginService.login(this.usuario);
  }

}
