import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registration } from '../models/registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationForm: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private render: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    const registration: Registration = {
      firstName: this.registrationForm.get('firstName')?.value,
      lastName: this.registrationForm.get('lastName')?.value,
      username: this.registrationForm.get('username')?.value,
      password: this.registrationForm.get('password')?.value
    }

    this.authService.register(registration)
    .subscribe({
      next: () => this.router.navigate(['']),
      error: () => this.showAlert()
    })
  }

  showAlert(): void {
    const alert = document.querySelector('#somethingWentWrongAlert');
    this.render.removeClass(alert, 'd-none');
    this.render.addClass(alert, 'd-block');
  }
}

