import { Commit } from "types/commit";

//Função para inicializar um Commit vazio
export function emptyCommit(): Commit  {
    return {
        id: '',
        mensagem: '',
        autor: '',
        data: ''
    }
}