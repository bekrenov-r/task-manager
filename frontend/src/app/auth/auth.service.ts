import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Registration } from '../models/registration';

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
    }).pipe(
      tap(value => {
        localStorage.setItem(environment.authTokenLocalStorageKey, value);
      })
    );
  }

  register(registration: Registration): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/users/register', registration, {responseType: 'text'})
    .pipe(
      tap(value => localStorage.setItem(environment.apiBaseUrl, value))
    );
  }

  isAuthenticated(): boolean {
    return Object.keys(localStorage).some(key => key === environment.authTokenLocalStorageKey);
  }
}

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(environment.authTokenLocalStorageKey)!;
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });


    return next.handle(request);
  }
}
