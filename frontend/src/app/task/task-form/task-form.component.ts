import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private render: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  createTask(): void {
    const name = this.taskForm.get('name')?.value;
    const description = this.taskForm.get('description')?.value;
    this.taskService.createTask(name, description)
      .subscribe({
        next: () => this.router.navigate(['/task-list']),
        error: () => this.showAlert()
      })
  }

  showAlert(): void {
    const alert = document.querySelector('#somethingWentWrongAlert');
    this.render.removeClass(alert, 'd-none');
    this.render.addClass(alert, 'd-block');
  }
}
