import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + "/users/authenticate", {
      params: {
        username: username,
        password: password
      },
      responseType: 'text'
    });
  }
}
