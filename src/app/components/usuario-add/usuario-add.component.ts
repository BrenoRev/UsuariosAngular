import { Injectable, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { Profissao } from "src/app/model/Profissao";
import { User } from "src/app/model/user";
import { UsuarioDTO } from "src/app/model/usuario-dto";
import { UsuarioService } from "src/app/service/usuario.service";


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
    return date ? this.validarDiaMes(date.day) + this.DELIMITER + this.validarDiaMes(date.month) + this.DELIMITER + date.year : null;
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
    return date ? this.validarDiaMes(date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

  validarDiaMes(valor: number){
    if(valor.toString() != '' && (valor) <= 9){
      console.log('0'+valor)
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
    descricao: ''
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
          this.idprofissao = this.usuario.userProfissao.id;
        })
  }

  salvarUsuario(){
    // Criar a entidade DTO
    this.transferDTO(this.usuario);

    // Atualizando ou editando caso já exista um usuários
    if(this.usuario.id != 0){
      this.transferDTO(this.usuario);
      this.sendProfissao.id = this.idprofissao;
      this.service.patchUsuario(this.usuarioSave).subscribe(
        (data) => {
          this.profissoes = data;
        });   
      }else{
        // Salvando um novo usuário
        this.usuarioSave.id = undefined;
        this.usuarioSave.senha = this.usuario.senha;
        this.usuarioSave.salario = this.usuario.userSalario;
        this.usuarioSave.profissao = this.sendProfissao;
        this.service.saveUsuario(this.usuarioSave).subscribe((data) => {
          this.usuario = data
        }
      );
    }
  }

  verifyData(){
    var dia = this.usuario.userDataNascimento.split('/')[0];
    var mes = this.usuario.userDataNascimento.split('/')[1];
    var ano = this.usuario.userDataNascimento.split('/')[2];
    if(parseInt(dia) <= 9){
      dia = '0'+dia
    }
    if(parseInt(mes) <= 9){
        mes = '0'+mes
    }
      return dia+'/'+mes+'/'+ano
  }

  transferDTO(usuario: User){
    this.usuarioSave.id = parseInt(usuario.id.toString());
    this.usuarioSave.login = usuario.userLogin;
    this.usuarioSave.nome= usuario.userNome;
    this.usuarioSave.cpf = usuario.userCpf;
    this.usuarioSave.dataNascimento = this.verifyData();
    this.usuarioSave.salario = usuario.userSalario;
    this.usuarioSave.profissao = this.sendProfissao
    this.usuarioSave.email = usuario.userEmail;
  }

  novo(){
    this.router.navigateByUrl('/usuarioAdd/0');
    this.ident = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.usuario.id = 0;
    this.usuario.userLogin = '';
    this.usuario.userNome = '';
    this.usuario.senha = '';
    this.usuario.userDataNascimento = '';
  }

}



