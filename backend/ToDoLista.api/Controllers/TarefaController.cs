using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;
using Model;

namespace Controllers
{
    [ApiController]
    [Route("api/tarefas")]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaRepository _tarefaRepository;

        public TarefaController(ITarefaRepository tarefaRepository)
        {
            _tarefaRepository = tarefaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tarefas = await _tarefaRepository.GetAllAsync();
            return Ok(tarefas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tarefa = await _tarefaRepository.GetByIdAsync(id);
            if (tarefa == null)
            {
                return NotFound();
            }
            return Ok(tarefa);
        }

        [HttpGet("titulo/{titulo}")]
        public async Task<IActionResult> GetByTitulo(string titulo)
        {
            var tarefa = await _tarefaRepository.GetByTituloAsync(titulo);
            if (tarefa == null)
            {
                return NotFound();
            }
            return Ok(tarefa);
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(string status)
        {
            var tarefas = await _tarefaRepository.GetByStatusAsync(status);
            if (tarefas == null || !tarefas.Any())
            {
                return NotFound();
            }
            return Ok(tarefas);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Tarefa tarefa)
        {
            if (tarefa == null)
            {
                return BadRequest("Tarefa não pode ser nula.");
            }

            await _tarefaRepository.AddAsync(tarefa);
            return CreatedAtAction(nameof(GetById), new { id = tarefa.Id }, tarefa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
            {
                return BadRequest("ID da tarefa não corresponde ao ID fornecido.");
            }

            var existingTarefa = await _tarefaRepository.GetByIdAsync(id);
            if (existingTarefa == null)
            {
                return NotFound();
            }

            await _tarefaRepository.UpdateAsync(tarefa);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tarefa = await _tarefaRepository.GetByIdAsync(id);
            if (tarefa == null)
            {
                return NotFound();
            }

            await _tarefaRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}