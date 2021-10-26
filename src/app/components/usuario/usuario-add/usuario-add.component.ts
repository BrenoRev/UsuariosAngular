import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  constructor(private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null){
      console.log(id);
    }else{
      console.log('Não tem id');
    }
  }

}
