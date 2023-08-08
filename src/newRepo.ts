import { Repositorio } from "types/repositorio";

//Função para inicializar um Repositório vazio
export function emptyRepo(): Repositorio  {
    return {
        id: null,
        projeto: '',
        branches: []
    }
}