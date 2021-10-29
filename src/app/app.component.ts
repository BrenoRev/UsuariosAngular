import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router){

}
  ngOnInit(): void {

    // Verificar a token do usuário
    if(localStorage.getItem('token') == null){
      this.router.navigateByUrl('login')
    }
  }

  sair(): void{
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

  esconderMenu(): boolean{
    if(localStorage.getItem('token') == null){
      return true;
    }
    return false;
  }
}
