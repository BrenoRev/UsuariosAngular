import { Telefone } from './../../../model/telefone';
import { UsuarioDTO } from './../../../model/usuario-dto';
import { UsuarioService } from './../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario: User = {
    id: 0,
    userLogin: '',
    userNome: '',
    userTelefones: []
  }

  telefone: Telefone = new Telefone();
  

  usuarioSave: UsuarioDTO = {
    id: 0,
    login: '',
    nome: '',
    senha: '',
    telefones: []
  }

  id!: number;

  constructor(private routeActive: ActivatedRoute
            , private service: UsuarioService,
              private router: Router) {

                this.telefone.usuario = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
               }

  ngOnInit(): void {
   this.id = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    
    if(this.id != null){
      this.buscarUsuario(this.id);
    }
    }

    buscarUsuario(id: number){
      this.service.getUsuarioId(id).subscribe(
        (data) => {
          this.usuario = data;
        })
  }

  salvarUsuario(){
    // Criar a entidade DTO
    this.transferDTO(this.usuario);

    // Atualizando ou editando caso já exista um usuários
    if(this.usuario.id != 0){
      this.usuarioSave.telefones = this.usuario.userTelefones;
      this.service.patchUsuario(this.usuarioSave).subscribe(
        (data) => {
          this.usuario = data;
          console.log(data)
        });   
      }else{
        // Salvando um novo usuário
        this.usuarioSave.id = undefined;
        this.usuarioSave.senha = this.usuario.senha;
        
        this.service.saveUsuario(this.usuarioSave).subscribe((data) => {
          this.usuario = data;
          console.log(data)
        }
      );
      
    }
  }

  transferDTO(usuario: User){
    this.usuarioSave.id = parseInt(usuario.id.toString());
    this.usuarioSave.login = usuario.userLogin;
    this.usuarioSave.nome= usuario.userNome;
  }

  novo(){
    this.router.navigateByUrl('/usuarioAdd/0');
    this.id = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.usuario.id = 0;
    this.usuario.userLogin = '';
    this.usuario.userNome = '';
    this.usuario.senha = '';
    this.usuario.userTelefones = [];
  }

  deletarTelefone(id: number){
    if(id !== null && confirm("Deseja remover?")){
    this.service.removerTelefone(id).subscribe(
      (data) => {
        const index = this.usuario.userTelefones?.findIndex(x => x.id === id); // Acha o index do telefone na lista
        this.usuario.userTelefones?.splice(index!, 1); // Remove o telefone da lista
      }
    );
}
}

  adicionarTelefone(){
      this.usuario.userTelefones!.push(this.telefone);
      this.telefone = new Telefone();
    }
}
