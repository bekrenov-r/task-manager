import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Registration } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_LS_KEY: string = 'task-manager-auth-token';
  private readonly BEARER_PREFIX: string = 'Bearer ';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + "/users/authenticate", {
      params: {
        username: username,
        password: password
      },
      responseType: 'text'
    }).pipe(
      tap(value => {
        localStorage.setItem(this.AUTH_TOKEN_LS_KEY, value);
      })
    );
  }

  register(registration: Registration): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/users/register', registration, {responseType: 'text'})
    .pipe(
      tap(value => localStorage.setItem(this.AUTH_TOKEN_LS_KEY, value))
    );
  }
}
