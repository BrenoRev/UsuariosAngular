import { Profissao } from './Profissao';

export class UsuarioDTO {
    id?: number
    login?: string
    nome?: string
    senha?: string
    cpf?: string
    dataNascimento?: string
    profissao! : Profissao;

    salario!: DoubleRange;
}

