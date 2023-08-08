import { Repositorio } from 'types/repositorio';
import { Branch } from 'types/branch';
import { Commit } from 'types/commit';

//Função para inicializar um Repositório vazio
export function emptyRepo(): Repositorio {
  return {
    id: null,
    projeto: '',
    branches: [],
  };
}

//Função para inicializar um Branch vazio
export function emptyBranch(): Branch {
  return {
    nome: '',
    commits: [],
  };
}

//Função para inicializar um Commit vazio
export function emptyCommit(): Commit {
  return {
    id: '',
    mensagem: '',
    autor: '',
    data: '',
  };
}
