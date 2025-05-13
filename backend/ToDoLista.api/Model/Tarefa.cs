using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class Tarefa
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        [Required]
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public DateTime? DataConclusao { get; set; }
        [Required]
        public Status Status { get; set; }
    }

    public enum Status
    {
        [Description("Pendente")]
        Pendente = 0,
        [Description("Concluída")]
        Concluida = 1
    }
}