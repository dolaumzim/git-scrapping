  import axios from 'axios';
  import { config } from 'dotenv';
  config();

  const token = process.env.GITLAB_TOKEN;
  const api = process.env.GITLAB_API_URL;

  export const buscaRepos = (repos = '' as string|number) => {
    return axios.get(`${api}${repos}`, {headers : {"Authorization" : `Bearer ${token}`}});
  }

  export const buscaBranches = (repos) => {
    return axios.get(`${api}${repos}/repository/branches`, {headers : {"Authorization" : `Bearer ${token}`}});
  }

  export const buscaCommits = (repos) => {
    return axios.get(`${api}${repos}/repository/commits?page=1&per_page=50`, {headers : {"Authorization" : `Bearer ${token}`}});
  }