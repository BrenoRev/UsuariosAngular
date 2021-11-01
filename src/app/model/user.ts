import { Telefone } from './telefone';
export interface User {
    id: number,
    userLogin: string,
    userNome: string,
    senha?: string,
    userTelefones?: Array<Telefone>
    userCpf: string
}
