import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/task-list']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password)
      .subscribe({
        next: () => this.router.navigate(['/task-list']),
        error: () => this.showAlert()
      });
  }

  showAlert(): void {
    const alert = document.querySelector('#invalidCredentialsAlert');
    this.render.removeClass(alert, 'd-none');
    this.render.addClass(alert, 'd-block');
  }
}
