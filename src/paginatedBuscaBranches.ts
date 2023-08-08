import { buscaBranches } from './gitLabAPI';

//função que utiliza a função buscaBranches para processar a paginação dos branches
//o while loop garante que todas as páginas de branches de um dado repositório ('repos')
//sejam percorridas até que não hajam mais branches

export const paginatedBuscaBranches = async (repos: number) => {
  let nullBranch = true;
  let responseBranchArray = [];
  let page = 1;

  while (nullBranch) {
    const branchAux = await buscaBranches(repos, page);
    nullBranch = branchAux.data.length > 0;
    if (nullBranch) {
      responseBranchArray.push(...branchAux.data);
    }
    page++;
  }
  return responseBranchArray;
};
