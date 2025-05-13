using Model;
using Repositories;

namespace Services.Interfaces {
    public interface ITarefaService {
        Task<IEnumerable<Tarefa>> GetAllAsync();
        Task<Tarefa?> GetByIdAsync(int id);
        Task<Tarefa?> GetByTituloAsync(string titulo);
        Task<IEnumerable<Tarefa>> GetByStatusAsync(string status);
        Task AddAsync(Tarefa tarefa);
        Task? UpdateAsync(Tarefa tarefa);
        Task? DeleteAsync(int id);
    }
}