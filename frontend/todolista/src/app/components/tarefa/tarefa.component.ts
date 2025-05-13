import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa, TarefaStatus } from '../../models/tarefa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { empty } from 'rxjs';

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
  tarefaConcluida: Tarefa[] = [];
  novaTarefa: Tarefa = { titulo: '', status: TarefaStatus.Pendente };

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.carregarTarefas();
    // this.carregarTarefasConcluidas();
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe(tarefas => {
      this.tarefas = tarefas.filter(tarefa => tarefa.status === TarefaStatus.Pendente);
      this.tarefaConcluida = tarefas.filter(tarefa => tarefa.status === TarefaStatus.Concluida);
    });
  }

  // carregarTarefasConcluidas(): void {
  //   this.tarefaService.getTarefasConcluidas().subscribe(tarefaConcluida => {
  //     this.tarefas = tarefaConcluida.filter(tarefaConcluida => tarefaConcluida.status === TarefaStatus.Concluida);
  //   });
  // }

  getStatusText(status: number): string {
    return status === 1 ? 'Concluída' : 'Pendente';
  }

  adicionarTarefa(): void {
    if (!this.novaTarefa.titulo.trim()) { return (alert('Título da tarefa não pode ser vazio!')); }

    if (!this.novaTarefa.descricao?.trim()) {
      this.novaTarefa.descricao = '';
    }

    this.novaTarefa.status = TarefaStatus.Pendente;
    this.novaTarefa.dataCriacao = new Date().toISOString();
    this.novaTarefa.dataConclusao = null;

    this.tarefaService.criarTarefa(this.novaTarefa).subscribe({
      next: (tarefaCriada) => {
        this.tarefas.push(tarefaCriada);
        this.novaTarefa = { titulo: '', status: 0 };
      },
      error: (erro) => {
        console.error('Erro ao adicionar tarefa:', erro);
      }
    });
  }


  deletarTarefa(id: number): void {
    this.tarefaService.deletarTarefa(id).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
      this.carregarTarefas();
    });
    
  }

  concluirTarefa(id: number): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;
    const tarefaAtualizada: Tarefa = {
      ...tarefa,
      status: TarefaStatus.Concluida,
      dataConclusao: new Date().toISOString()
    };
    console.log(tarefaAtualizada);
    this.tarefaService.concluirTarefa(tarefaAtualizada).subscribe(() => {
      this.tarefas = this.tarefas.map(t =>
        t.id === id ? tarefaAtualizada : t
      );
      this.carregarTarefas();
    });
  }

  pendenteTarefa(id: number): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;
    const tarefaAtualizada: Tarefa = {
      ...tarefa,
      status: 0,
      dataConclusao: null,
      dataCriacao: tarefa.dataCriacao,
    };
    console.log(tarefaAtualizada);
    this.tarefaService.PendenteTarefa(tarefaAtualizada).subscribe(() => {
      this.tarefas = this.tarefas.map(t =>
        t.id === id ? tarefaAtualizada : t
      );
    });
  }
}
