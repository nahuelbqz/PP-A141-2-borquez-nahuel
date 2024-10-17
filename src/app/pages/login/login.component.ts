import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  toastAlert = inject(ToastrService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: string | null = null;

  formLogin = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    const value = this.formLogin.getRawValue();
    this.authService.login(value.email, value.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        console.log('Logueo exitoso');
      },
      error: (err) => {
        this.errorMessage = err.code;
        console.log(this.errorMessage);
        console.log('Error al loguear');
      },
    });
  }

  onAccesoRapido(numero: number): void {
    switch (numero) {
      case 1:
        this.formLogin.setValue({
          email: 'admin@admin.com',
          password: 'soyadmin',
        });
        console.log('Administrador, campos cargados');
        break;

      case 2:
        this.formLogin.setValue({
          email: 'empleado@empleado.com',
          password: 'soyempleado',
        });
        console.log('Empleado, campos cargados');
        break;

      default:
        break;
    }
  } //onAccesoRapido

  reiniciar() {
    this.formLogin.setValue({
      email: '',
      password: '',
    });
  }
}
