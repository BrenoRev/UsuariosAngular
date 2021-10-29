import { User } from './../../model/user';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: User[] = []
  nome!: string;

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.getStudentList().subscribe( (data) => {
    this.students = data
    })
  }

  deleteUsuario(id: number){
    if(confirm ("Deseja realmente excluir o usuário?")){
    this.service.deletarUsuario(id).subscribe( (data) => {
      
      this.service.getStudentList().subscribe( (data) => {
        this.students = data
        })

    })
  }
  } 

  consultaUser(){
    if(this.nome == ""){
      this.service.getStudentList().subscribe( (data) => {
        this.students = data
      })
    }else{
    this.service.getUsuarioNome(this.nome).subscribe( (data) => {
      console.log(data)
      this.students = data
    })
  }
}

  }


