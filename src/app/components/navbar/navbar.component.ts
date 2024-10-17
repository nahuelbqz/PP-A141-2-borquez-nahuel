import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  rolUsuario = '';
  isLogged = false;
  currentUser: any = null;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        if (user.email! === 'admin@admin.com') {
          this.rolUsuario = 'admin';
        } else {
          this.rolUsuario = 'empleado';
        }

        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          rol: this.rolUsuario,
        });
      } else {
        this.authService.currentUserSig.set(null);
        this.isLogged = false;
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/bienvenida');
  }
}
