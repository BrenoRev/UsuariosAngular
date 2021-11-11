import { Profissao } from './Profissao';
export class User {
    id!: number;
    userLogin!: string;
    userNome!: string
    senha?: string
    userCpf!: string
    dataNascimento!: string
    profissao! : Profissao;

}
