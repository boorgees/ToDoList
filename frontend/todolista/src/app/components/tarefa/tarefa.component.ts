import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tarefa',
  imports: [FormsModule, CommonModule, HttpClientModule],
  standalone: true,
  providers: [TarefaService],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  novaTarefa: Tarefa = { titulo: '', status: 'Pendente' };

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  adicionarTarefa(): void {
    if (!this.novaTarefa.titulo.trim()) return;
  
    this.tarefaService.criarTarefa(this.novaTarefa).subscribe({
      next: (tarefaCriada) => {
        this.tarefas.push(tarefaCriada);
        this.novaTarefa = { titulo: '', status: 'Pendente' };
      },
      error: (erro) => {
        console.error('Erro ao adicionar tarefa:', erro);
      }
    });
  }
  

  deletarTarefa(id: number): void {
    this.tarefaService.deletarTarefa(id).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
    });
  }
}
