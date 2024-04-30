import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiBaseUrl + '/tasks');
  }
  
  createTask(name: string, description: string): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/tasks', {
      name: name,
      description: description
    });
  }

  updateTask(id: number, name: string, description: string): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/tasks/' + id, {
      name: name,
      description: description
    });
  }

  finishTask(id: number): Observable<any> {
    return this.http.patch(environment.apiBaseUrl + '/tasks/' + id, null);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/tasks/' + id);
  }
}
