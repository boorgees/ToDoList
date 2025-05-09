export class Tarefa {
}

export interface Tarefa {
    id?: number; // O id é opcional, pois ele será gerado automaticamente pelo banco de dados
    titulo: string;
    descricao?: string;
    dataCriacao?: string;
    dataConclusao?: string | null;
    status: 'Pendente' | 'EmAndamento' | 'Concluida';
  }
  
