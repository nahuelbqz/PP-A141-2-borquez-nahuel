import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  toastAlert = inject(ToastrService);

  formRegister = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  onSubmit(): void {
    const value = this.formRegister.getRawValue();
    this.authService
      .register(value.email, value.username, value.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/bienvenida');
        },
        error: () => {
          this.toastAlert.error(
            'Email, Username or Password incorrect',
            'Sing Up Error'
          );
        },
      });
  }
}
