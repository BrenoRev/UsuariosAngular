import { User } from 'src/app/model/user';
import { UsuarioDTO } from './../../model/usuario-dto';
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

  studentSend = {
    id : 0,
    login : "",
    nome : ""
  }

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.carregarPagina(1);
  }

  p!: number;
  total!: number;

  deleteUsuario(id: number){
    if(confirm ("Deseja realmente excluir o usuário?")){
    this.service.deletarUsuario(id).subscribe( (data) => {
      
      this.studentsMain.splice(this.studentsMain.findIndex(x => x.id == id), 1)

    })
  }
  } 

  consultaUser(){
    if(this.nome == ""){
      this.carregarPagina(1);
    }else{
    this.service.getUsuarioNome(this.nome, 1).subscribe( (data) => {
      this.studentsMain = data.content
      this.total = data.totalElements;   
      });
  }
}

carregarPagina(pagina: number){
  this.service.getStudentListPage(pagina-1).subscribe((data) => {
   
    this.studentsMain = data.content
    this.total = data.totalElements;
  })
}

  }


