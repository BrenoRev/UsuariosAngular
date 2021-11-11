import { UsuarioDTO } from './../../../model/usuario-dto';
import { UsuarioService } from './../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/Profissao';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let data = value.split(this.DELIMITER);
      return {
        day: this.validarDiaMes(parseInt(data[0], 10)),
        month: this.validarDiaMes(parseInt(data[1], 10)),
        year: parseInt(data[2], 10)
      };
    }
    return null
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

  validarDiaMes(valor: number): number{
    if(valor.toString() != '' && (valor) <= 9){
      return parseInt('0' + valor);
    }
    return valor;
  }
}

@Injectable()
export class FormataData extends NgbDateParserFormatter{
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if(value){
      let data = value.split(this.DELIMITER);
      return {
        day: parseInt(data[0], 10),
        month: parseInt(data[1], 10),
        year: parseInt(data[2], 10)
      };
    }
    return null;
  }
  format(date: NgbDateStruct | null): string {
    return date ? this.validarDiaMes(date.day) + this.DELIMITER + this.validarDiaMes(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

  validarDiaMes(valor: number){
    if(valor.toString() != '' && (valor) <= 9){
      return '0' + valor;
    }
    return valor;
  }

}


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{
  provide: NgbDateParserFormatter, useClass: FormataData
  }, 
  {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UsuarioAddComponent implements OnInit {

  idprofissao!:number

  sendProfissao: Profissao = {
    id: this.idprofissao,
    descricao: 'empty'
  }

  profissoes! : Array<Profissao>
  
  usuario = new User();

  usuarioSave = new UsuarioDTO();

  ident!: number;

 

  constructor(private routeActive: ActivatedRoute
            , private service: UsuarioService,
              private router: Router) {
               }

  ngOnInit(): void {

    this.ident = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.usuario.id = this.ident

    if(this.ident != null){
      this.buscarUsuario(this.ident);
    }
    
    this.service.getProfissaoList().subscribe(data => {
      this.profissoes = data;
    });
    
  }
  
    buscarUsuario(id: number){
      this.service.getUsuarioId(id).subscribe(
        (data) => {
          this.usuario = data;
        })
  }

  salvarUsuario(){
    console.log("id da profissao " + this.idprofissao)
    // Criar a entidade DTO
    this.transferDTO(this.usuario);

    // Atualizando ou editando caso já exista um usuários
    if(this.usuario.id != 0){
      this.service.patchUsuario(this.usuarioSave).subscribe(
        (data) => {
          this.profissoes = data;
        });   
      }else{
        // Salvando um novo usuário
        this.usuarioSave.id = undefined;
        this.usuarioSave.senha = this.usuario.senha;
        this.usuarioSave.salario = this.usuario.salario;
        this.usuarioSave.profissao = this.sendProfissao;
        console.log("usuario save" + this.usuarioSave)
        console.log("Profissao usuario " +this.usuarioSave.profissao)
        console.log("Send profissao "+this.sendProfissao)
        console.log(this.usuarioSave);
        this.service.saveUsuario(this.usuarioSave).subscribe((data) => {
          this.usuario = data
        }
      );
    }
  }

  transferDTO(usuario: User){
    this.usuarioSave.id = parseInt(usuario.id.toString());
    this.usuarioSave.login = usuario.userLogin;
    this.usuarioSave.nome= usuario.userNome;
    this.usuarioSave.cpf = usuario.userCpf;
    this.usuarioSave.dataNascimento = usuario.dataNascimento;
    this.usuarioSave.salario = usuario.salario;
    this.usuarioSave.profissao = this.sendProfissao
  }

  novo(){
    this.router.navigateByUrl('/usuarioAdd/0');
    this.ident = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.usuario.id = 0;
    this.usuario.userLogin = '';
    this.usuario.userNome = '';
    this.usuario.senha = '';
    this.usuario.dataNascimento = '';
  }

}



