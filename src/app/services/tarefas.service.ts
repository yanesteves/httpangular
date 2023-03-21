import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.baseUrl}/tarefas`);
  }

  getTarefa(id: string): Observable<any> {
    return this.http.get<Tarefa>(`${this.baseUrl}/tarefas/${id}`)
  }

  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.baseUrl}/tarefas`, tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tarefas/${tarefa.id}`, tarefa);
  }

  excluirTarefa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tarefas/${id}`);
  }
}
