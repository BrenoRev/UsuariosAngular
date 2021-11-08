import { Telefone } from "./telefone";

export interface UsuarioDTO {
    id?: number,
    login?: string,
    nome?: string,
    senha?: string,
    telefones?: Array<Telefone>
    cpf?: string
}

