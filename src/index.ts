import { Repositorio } from 'types/repositorio';
import { config } from 'dotenv';
import {emptyRepo} from './newRepo';
import {emptyBranch} from './newBranch';
import {emptyCommit} from './newCommit';
import { buscaRepos, buscaBranches, buscaCommits } from './funcoesBusca'; //funcoes 'get' para requisições

config();

export const buscaRepositorios = async (): Promise<Repositorio[]> => {
  let repoArray : number[] = [];
  let resultRepo : Repositorio[] = [];
  
  try{
  const responseRepoArray = await buscaRepos();
  
    for (let singleRepo of responseRepoArray.data){
      (repoArray.push(singleRepo.id));
    }
  
    for (let repos of repoArray){
      const loopRepo = emptyRepo();
      const loopBranch = emptyBranch();

      let [promiseRepo, promiseBranch, promiseCommit] = await Promise.all([
        buscaRepos(repos),
        buscaBranches(repos),
        buscaCommits(repos)
      ])

      for (let data of promiseBranch.data){
        loopBranch.nome = data.name;
        for (let data of promiseCommit.data){
          const loopCommit = emptyCommit();

          loopCommit.id = data.id;
          loopCommit.mensagem = data.message;
          loopCommit.autor = data.author_name;
          loopCommit.data = data.created_at;
          loopBranch.commits.push(loopCommit);
        }
      }
      loopRepo.id = promiseRepo.data.id;
      loopRepo.projeto = promiseRepo.data.name_with_namespace;
      loopRepo.branches = [loopBranch];
      resultRepo.push(loopRepo);
    }
  
  return resultRepo;
  }
  catch (erro){
    return erro;
  }
};

// buscaRepositorios().then(resposta => console.log(JSON.stringify(resposta,null,2)));
buscaRepositorios().then(console.log);
