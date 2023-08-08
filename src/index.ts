import { Repositorio } from 'types/repositorio';
import { config } from 'dotenv';
import { emptyRepo, emptyBranch, emptyCommit } from './initializeTypes';
import { buscaRepos } from './gitLabAPI'; //funcoes 'get' para requisições
import { paginatedBuscaProjs } from './paginatedBuscaProjs';
import { paginatedBuscaBranches } from './paginatedBuscaBranches';
import { paginatedBuscaCommits } from './paginatedBuscaCommits';
config();

export const buscaRepositorios = async (): Promise<Repositorio[]> => {
  let repoArray: number[] = [];       //array de id's de projetos para que a busca passe por cada projeto
  let resultRepo: Repositorio[] = []; //array resultante do exercício

  try {
    const responseRepoArray = await paginatedBuscaProjs();

    for (let singleRepo of responseRepoArray) {
      repoArray.push(singleRepo.id);  //cria um array de id's de todos os projetos
    }

    for (let repos of repoArray) {
      const loopRepo = emptyRepo();
      const loopBranch = emptyBranch();

      let [promiseRepo, promiseBranch, promiseCommit] = await Promise.all([
        buscaRepos(repos),
        paginatedBuscaBranches(repos),
        paginatedBuscaCommits(repos),
      ]);

      for (let data of promiseBranch) {     //esse loop passa pelas informações obtidas através da requisição
        loopBranch.nome = data.name;        //de um único projeto, assim atribui todos os valores de cada tipo
        for (let data of promiseCommit) {   //(Repositorio, Branch e Commit), antes de recomeçar os loop para
          const loopCommit = emptyCommit(); //um novo projeto
          
          loopCommit.id = data.id;
          loopCommit.mensagem = data.message; //para evitar erros de mapeamento gerados por diferentes chaves
          loopCommit.autor = data.author_name; //foi utilizada a atribuição direta das variáveis
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
  } catch (erro) {
    console.error(erro);  //o erro é retornado diretamente no console, a informação de cada erro pode ser
    return erro;          //analisada através do terminal
  }
};
buscaRepositorios().then(console.log);
