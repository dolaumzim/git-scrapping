import { Repositorio } from "types/repositorio";

export function emptyRepo(): Repositorio  {
    return {
        id: null,
        projeto: '',
        branches: []
    }
}