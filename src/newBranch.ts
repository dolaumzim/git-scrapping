import { Branch } from "types/branch";

export function emptyBranch(): Branch  {
    return {
        nome: '',
        commits: []
    }
}