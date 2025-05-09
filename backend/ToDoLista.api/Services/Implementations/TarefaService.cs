using Model;
using Repositories.Interfaces;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Services.Implementations {
    public class TarefaService : ITarefaService {
        private readonly ITarefaRepository _tarefaRepository;

        public TarefaService(ITarefaRepository tarefaRepository) {
            _tarefaRepository = tarefaRepository;
        }

        public async Task<IEnumerable<Tarefa>> GetAllAsync() {
            try {
                var tarefas = await _tarefaRepository.GetAllAsync();
                return tarefas;
            } catch (Exception ex) {
                
                throw new Exception("Erro ao obter tarefas", ex);
            }
        }

        public async Task<Tarefa?> GetByIdAsync(int id) {
           try {
                var tarefa = await _tarefaRepository.GetByIdAsync(id);
                return tarefa;
            } catch (Exception ex) {

                throw new Exception("Erro ao obter tarefa", ex);
            }
        }

        public async Task<Tarefa?> GetByTituloAsync(string titulo) {
           try {
                var tarefa = await _tarefaRepository.GetByTituloAsync(titulo);
                return tarefa;
            } catch (Exception ex) {

                throw new Exception("Erro ao obter tarefa", ex);
            }
        }

        public async Task AddAsync(Tarefa tarefa) {
           try {
                await _tarefaRepository.AddAsync(tarefa);
            } catch (Exception ex) {

                throw new Exception("Erro ao adicionar tarefa", ex);
            }
        }

        public async Task UpdateAsync(Tarefa tarefa) {
            try {
                await _tarefaRepository.UpdateAsync(tarefa);
            } catch (Exception ex) {

                throw new Exception("Erro ao atualizar tarefa", ex);
            }
        }

        public async Task? DeleteAsync(int id) {
            try {
                await _tarefaRepository.DeleteAsync(id);
            } catch (Exception ex) {

                throw new Exception("Erro ao deletar tarefa", ex);
            }
        }
    }
}