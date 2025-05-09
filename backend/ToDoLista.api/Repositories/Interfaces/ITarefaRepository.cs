using Model;

namespace Repositories.Interfaces {
    public interface ITarefaRepository
    {
        Task<IEnumerable<Tarefa>> GetAllAsync();
        Task<Tarefa?> GetByIdAsync(int id);
        Task<Tarefa?> GetByTituloAsync(string titulo);
        Task AddAsync(Tarefa tarefa);
        Task? UpdateAsync(Tarefa tarefa);
        Task? DeleteAsync(int id);
    }
}