import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/interfaces/tarefa';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  tarefas: Tarefa[] = [];

  constructor(private tarefasService: TarefasService,
    private router: Router,
    private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.myForm = this.fb.group({
      titulo: ['', [Validators.required]],
      concluida: [false]
    })
    this.listarTarefas();
  }

  listarTarefas() {
    this.tarefasService.getTarefas().subscribe(data => {
      this.tarefas = data;
    })
  }

  async criarTarefa() {
    const tarefa: Tarefa = this.myForm.value;
    
    await this.tarefasService.criarTarefa(tarefa);
    this.listarTarefas()
  }

  editarTarefa(tarefa: Tarefa) {
    this.router.navigate([`/tarefa/${tarefa.id}`])
  }

  async excluirTarefa(tarefa: Tarefa) {
    this.tarefasService.excluirTarefa(tarefa.id).toPromise().then(() => {
      this.listarTarefas()
    }, err => {
      console.log(err)
    })    
  }

}
