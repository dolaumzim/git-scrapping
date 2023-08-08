import { Commit } from "types/commit";

export function emptyCommit(): Commit  {
    return {
        id: '',
        mensagem: '',
        autor: '',
        data: ''
    }
}