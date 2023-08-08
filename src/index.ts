import { Repositorio } from 'types/repositorio';
import { config } from 'dotenv';
import axios from 'axios';
import {emptyRepo} from './newRepo';
import {emptyBranch} from './newBranch';
import {emptyCommit} from './newCommit';
config();

export const buscaRepositorios = async (): Promise<Repositorio[]> => {
  const token = process.env.GITLAB_TOKEN;
  let repoArray : number[] = [];
  let resultRepo : Repositorio[] = [];
  
  const response1 = 
  await axios.get('https://git.raroacademy.com.br/api/v4/projects', {headers : {"Authorization" : `Bearer ${token}`}})
  
    for (let repos of response1.data){
      (repoArray.push(repos.id));
    }
  
    for (let repos of repoArray){
      let response2 = await Promise.all([
        axios.get(`https://git.raroacademy.com.br/api/v4/projects/${repos}`, {headers : {"Authorization" : `Bearer ${token}`}}),
        axios.get(`https://git.raroacademy.com.br/api/v4/projects/${repos}/repository/branches`, {headers : {"Authorization" : `Bearer ${token}`}}),
        axios.get(`https://git.raroacademy.com.br/api/v4/projects/${repos}/repository/commits?per_page=50`, {headers : {"Authorization" : `Bearer ${token}`}})
      ])

    const loopRepo = emptyRepo();
    const loopBranch = emptyBranch();
    
    for (let data of response2[1].data){
      loopBranch.nome = data.name;
      for (let data of response2[2].data){
        const loopCommit = emptyCommit();
        loopCommit.id = data.id;
        loopCommit.mensagem = data.message;
        loopCommit.autor = data.author_name;
        loopCommit.data = data.created_at;
        loopBranch.commits.push(loopCommit);
      }
    }
  
    loopRepo.id = response2[0].data.id;
    loopRepo.projeto = response2[0].data.name_with_namespace;
    loopRepo.branches = [loopBranch];
    
    resultRepo.push(loopRepo);
  }
  
  return resultRepo;
};


buscaRepositorios().then(console.log);
