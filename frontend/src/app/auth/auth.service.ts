import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Registration } from '../models/registration';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtPayload: any;
  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + "/users/authenticate", {
      params: {
        username: username,
        password: password
      },
      responseType: 'text'
    }).pipe(
      tap(token => {
        localStorage.setItem(environment.authTokenLocalStorageKey, token);
        this._isAuthenticated$.next(true);
        this.jwtPayload = jwtDecode(token);
      })
    );
  }

  register(registration: Registration): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/users/register', registration, {responseType: 'text'})
    .pipe(
      tap(value => localStorage.setItem(environment.authTokenLocalStorageKey, value))
    );
  }

  isAuthenticated(): boolean {
    return Object.keys(localStorage).some(key => key === environment.authTokenLocalStorageKey);
  }

  logout(): void {
    localStorage.removeItem(environment.authTokenLocalStorageKey);
  }

  getJwtPayload(): any {
    console.log(jwtDecode(localStorage.getItem(environment.authTokenLocalStorageKey)!));
    console.log(localStorage.getItem(environment.authTokenLocalStorageKey)!);
    
    return jwtDecode(localStorage.getItem(environment.authTokenLocalStorageKey)!);
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
