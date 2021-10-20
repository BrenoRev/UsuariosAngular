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
  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.getStudentList().subscribe( (data) => {
      this.students = data;
    })
  }

}
