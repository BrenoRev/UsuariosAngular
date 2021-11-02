import { UsuarioDTO } from './../../model/usuario-dto';
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
  studentsMain : UsuarioDTO[] = []
  nome!: string;

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.carregarPagina(1);
  }

  p!: number;
  total!: number;

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

carregarPagina(pagina: number){
  this.service.getStudentListPage(pagina-1).subscribe((data) => {
    this.studentsMain = data.content
    this.total = data.totalElements;
  })
}

  }


