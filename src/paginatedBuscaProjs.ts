import { buscaProjs } from './gitLabAPI';

//função que utiliza a função buscaProjs para processar a paginação dos projetos
//o while loop garante que todas as páginas de projetos
//sejam percorridas até que não hajam mais projetos

export const paginatedBuscaProjs = async () => {
  let nullProject = true;
  let responseRepoArray = [];
  let page = 1;

  while (nullProject) {
    const projectAux = await buscaProjs(page);
    nullProject = projectAux.data.length > 0;
    if (nullProject) {
      responseRepoArray.push(...projectAux.data);
    }
    page++;
  }
  return responseRepoArray;
};
