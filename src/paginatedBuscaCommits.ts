import { buscaCommits } from './gitLabAPI';

//função que utiliza a função buscaCommits para processar a paginação dos commits
//o while loop garante que todas as páginas de commits de um dado branch
//sejam percorridas até que não hajam mais commits

export const paginatedBuscaCommits = async (repos: number) => {
  let nullCommit = true;
  let responseCommitArray = [];
  let page = 1;

  while (nullCommit) {
    const commitAux = await buscaCommits(repos, page);
    nullCommit = commitAux.data.length > 0;
    if (nullCommit) {
      responseCommitArray.push(...commitAux.data);
    }
    page++;
  }
  return responseCommitArray;
};
