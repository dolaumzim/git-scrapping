import axios from 'axios';
import { config } from 'dotenv';
config();

//Este arquivo reúne funções semelhantes para cada tipo de requisição,
//as três últimas são utilizadas nos arquivos de paginação

const token = process.env.GITLAB_TOKEN;
const api = process.env.GITLAB_API_URL;

export const buscaProjs = (page: number, per_page = 20) => {      //Essa função retorna um array de todos os projetos
  return axios.get(`${api}?page=${page}&per_page=${per_page}`, {  //para que possam ser chamados um a um na função
    headers: { Authorization: `Bearer ${token}` },                //buscarRepos
  });
};

export const buscaRepos = (repos: number) => {
  return axios.get(`${api}${repos}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const buscaBranches = (repos: number, page: number, per_page = 20) => {
  return axios.get(
    `${api}${repos}/repository/branches?page=${page}&per_page=${per_page}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const buscaCommits = (repos: number, page: number, per_page = 20) => {
  return axios.get(
    `${api}${repos}/repository/commits?page=${page}&per_page=${per_page}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
