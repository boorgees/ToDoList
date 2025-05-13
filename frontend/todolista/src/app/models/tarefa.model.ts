export enum TarefaStatus {
    Pendente,
    Concluida
}

export interface Tarefa {
    id?: number;
    titulo: string;
    descricao?: string;
    dataCriacao?: string;
    dataConclusao?: string | null;
    status: TarefaStatus;
}