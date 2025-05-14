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
  tarefaEditada: Tarefa = {} as Tarefa;
  tarefaSelecionada: Tarefa = {} as Tarefa;
  novaTarefa: Tarefa = { titulo: '', status: TarefaStatus.Pendente };
  mostrarModal: boolean = false;

  constructor(private tarefaService: TarefaService) { }

  // MÉTODOS QUE INICIAM COM A APLICAÇÃO
  ngOnInit(): void {
    this.carregarTarefas();
    // this.carregarTarefasConcluidas();
  }

  editarTarefa(id: number): void {
    // Encontrar a tarefa que será editada
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;

    this.tarefaEditada = { ...tarefa };  // Copia os dados da tarefa selecionada
    this.mostrarModal = true;  // Exibe o modal
  }

  fecharModal(): void {
    this.mostrarModal = false;  // Fecha o modal
  }

  salvarEdicao(): void {
    this.tarefaService.atualizarTarefa(this.tarefaEditada).subscribe(() => {
      // Atualiza a lista de tarefas após a edição
      this.tarefas = this.tarefas.map(t =>
        t.id === this.tarefaEditada.id ? this.tarefaEditada : t
      );
      this.fecharModal();  // Fecha o modal
    });
  }

  // MÉTODO PARA CARREGAR AS TAREFAS
  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe(tarefas => {
      this.tarefas = tarefas.filter(tarefa => tarefa.status === TarefaStatus.Pendente);
      this.tarefaConcluida = tarefas.filter(tarefa => tarefa.status === TarefaStatus.Concluida);
    });
  }

  // MÉTODO PARA LIDAR COM OS STATUS DAS TAREFAS
  getStatusText(status: number): string {
    return status === 1 ? 'Concluída' : 'Pendente';
  }

  // MÉTODO PARA ADICIONAR AS TAREFAS
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

  // MÉTODO PARA DELETAR AS TAREFAS
  deletarTarefa(id: number): void {
    this.tarefaService.deletarTarefa(id).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
      this.carregarTarefas();
    });

  }

  // MÉTODO PARA CONCLUIR A TAREFA
  concluirTarefa(id: number): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;
    const tarefaAtualizada: Tarefa = {
      ...tarefa,
      status: TarefaStatus.Concluida,
      dataConclusao: new Date().toISOString()
    };
    console.log(tarefaAtualizada);
    this.tarefaService.atualizarTarefa(tarefaAtualizada).subscribe(() => {
      this.tarefas = this.tarefas.map(t =>
        t.id === id ? tarefaAtualizada : t
      );
      this.carregarTarefas();
    });
  }

  // MÉTODO PARA TORNAR A TAREFA PENDENTE NOVAMENTE
  pendenteTarefa(id: number): void {
    const tarefa = this.tarefaConcluida.find(t => t.id === id);
    if (!tarefa) return;
    const tarefaAtualizada: Tarefa = {
      ...tarefa,
      status: TarefaStatus.Pendente,
      dataConclusao: null,
      dataCriacao: tarefa.dataCriacao,
    };
    console.log(tarefaAtualizada);
    this.tarefaService.atualizarTarefa(tarefaAtualizada).subscribe({
      next: () => {
        this.tarefas = this.tarefas.map(t =>
          t.id === id ? tarefaAtualizada : t
        );
        this.carregarTarefas();
      },
      error: (err) => {
        console.error('Erro ao reabrir tarefa:', err);
      }
    });
  }

  // filtroTarefa(titulo: string) {
  //   if (!titulo) {
  //     this.carregarTarefas();  // Se o campo de filtro estiver vazio, recarrega todas as tarefas

  //   } else {
  //     this.tarefaService.getTarefas().subscribe(tarefas => {
  //       this.tarefas = tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(titulo.toLowerCase()));
  //     });
  //   }
  //   return this.tarefas;
  // }
}