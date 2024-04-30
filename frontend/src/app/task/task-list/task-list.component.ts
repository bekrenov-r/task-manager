import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => this.tasks = data);
  }

  finishTask(id: number) {
    this.taskService.finishTask(id).subscribe(() => this.ngOnInit());
  }
}
