import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((user) => {
      if (user?.email === 'admin@admin.com') {
        console.log('El usuario es administrador.');
        return true; // Permitir el acceso
      } else {
        console.log('El usuario no es administrador.');
        return false; // Denegar el acceso
      }
    })
  );
};
