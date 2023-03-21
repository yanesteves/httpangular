import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {

  tarefaId: any = '';
  tarefa!: any | Tarefa;

  constructor(private activatedRoute: ActivatedRoute,
    private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.tarefaId = this.activatedRoute.snapshot.paramMap.get('id')    
    this.getTarefa()    
  }

  async getTarefa() {    
    if (this.tarefaId == null) {
      return;
    }
    this.tarefasService.getTarefa(this.tarefaId).toPromise().then((data)=> {
      this.tarefa = data;
      alert(`Tarefa aberta: ${this.tarefa.titulo}`)
    })    
  }

}
