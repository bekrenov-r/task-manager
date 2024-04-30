import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  fullName: string = '';
  isAuthenticated: boolean = false;
  jwtPayload$: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.isAuthenticated$.subscribe(value => { 
      this.isAuthenticated = value;
      if(this.isAuthenticated){
        this.fullName = this.authService.getJwtPayload()['fullName'];
      }
    });
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated){
      this.fullName = this.authService.getJwtPayload()['fullName'];
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
