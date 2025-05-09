import { Routes } from '@angular/router';
import { TarefaComponent } from './components/tarefa/tarefa.component';

export const routes: Routes = [
    {path: '', redirectTo: 'tarefa', pathMatch: 'full'},
    {path: 'tarefa', component: TarefaComponent}
];
