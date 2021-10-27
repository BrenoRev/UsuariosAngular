import { UsuarioService } from './../../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario!: User;

  constructor(private routeActive: ActivatedRoute
            , private service: UsuarioService) { }

  ngOnInit(): void {
    let id = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    
    if(id != null){
      this.buscarUsuario(id);
    }
    }

    buscarUsuario(id: number){
      this.service.getUsuarioId(id).subscribe(
        (data) => {
          this.usuario = data;
        })
  }

}
