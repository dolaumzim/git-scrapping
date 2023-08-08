import { Branch } from "types/branch";

//Função para inicializar um Branch vazio
export function emptyBranch(): Branch  {
    return {
        nome: '',
        commits: []
    }
}