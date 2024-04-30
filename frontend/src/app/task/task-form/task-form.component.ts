import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup = new FormGroup('');
  submitButtonText: string = '';
  formMode: string = '';
  taskId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private render: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.formMode = params['id'] ? 'UPDATE' : 'CREATE';
      switch (this.formMode) {
        case 'UPDATE':
          this.taskId = +params['id'];
          this.initInUpdateMode();
          break;
        case 'CREATE':
          this.initInCreateMode();
          break;
      }
    });
  }

  onSubmit(): void {
    const name = this.taskForm.get('name')?.value;
    const description = this.taskForm.get('description')?.value;
    let result$: Observable<any> = this.formMode === 'UPDATE' 
      ? this.taskService.updateTask(this.taskId, name, description) 
      : this.taskService.createTask(name, description);
    result$.subscribe({
        next: () => this.router.navigate(['/task-list']),
        error: () => this.showAlert()
      });
  }

  showAlert(): void {
    const alert = document.querySelector('#somethingWentWrongAlert');
    this.render.removeClass(alert, 'd-none');
    this.render.addClass(alert, 'd-block');
  }

  initInCreateMode(): void {
    this.submitButtonText = 'Dodaj';
  }

  initInUpdateMode(): void {
    this.submitButtonText = 'Zapisz';
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      const task = tasks.find(t => t.id === this.taskId);
      if (!task) {
        this.router.navigate(['/task-list']);
      }
      this.taskForm.patchValue(task!);
    });
  }
}
