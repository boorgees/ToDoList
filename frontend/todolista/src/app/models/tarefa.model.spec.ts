import { Tarefa } from './tarefa.model';

describe('Tarefa', () => {
  it('should exist as a type', () => {
    const tarefa: Tarefa = {} as Tarefa;
    expect(tarefa).toBeTruthy();
  });
});
