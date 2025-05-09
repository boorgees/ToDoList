using Microsoft.EntityFrameworkCore;
using Model;
using Repositories.Interfaces;
using Data;


namespace Repositories
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly AppDbContext _context;

        public TarefaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tarefa>> GetAllAsync()
        {
            return await _context.Tarefas.ToListAsync();
        }

        public async Task<Tarefa?> GetByIdAsync(int id)
        {
            return await _context.Tarefas.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Tarefa?> GetByTituloAsync(string titulo)
        {
            return await _context.Tarefas.FirstOrDefaultAsync(t => t.Titulo == titulo);
        }

        public async Task AddAsync(Tarefa tarefa)
        {
            await _context.Tarefas.AddAsync(tarefa);
            await _context.SaveChangesAsync();
        }

        public async Task? UpdateAsync(Tarefa tarefa)
        {
            var existingTarefa = await _context.Tarefas.FindAsync(tarefa.Id);
            if (existingTarefa != null)
            {
                existingTarefa.Titulo = tarefa.Titulo;
                existingTarefa.Descricao = tarefa.Descricao;
                existingTarefa.DataConclusao = tarefa.DataConclusao;
                existingTarefa.Status = tarefa.Status;
                await _context.SaveChangesAsync();
            }
        }
        public async Task? DeleteAsync(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa != null)
            {
                _context.Tarefas.Remove(tarefa);
                await _context.SaveChangesAsync();
            }
        }
    }
}