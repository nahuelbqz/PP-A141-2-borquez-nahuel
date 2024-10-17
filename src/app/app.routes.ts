import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'bienvenida',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (m) => m.BienvenidaComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'producto-alta',
    loadComponent: () =>
      import('./pages/producto-alta/producto-alta.component').then(
        (m) => m.ProductoAltaComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'producto-detalle',
    loadComponent: () =>
      import('./pages/producto-detalle/producto-detalle.component').then(
        (m) => m.ProductoDetalleComponent
      ),
    canActivate: [loginGuard],
  },
  // {
  //   path: 'lista-prod-publica',
  //   loadComponent: () =>
  //     import('./pages/lista-prod-publica/lista-prod-publica.component').then(
  //       (m) => m.ListaProdPublicaComponent
  //     ),
  // },
  {
    path: 'abm-container',
    loadComponent: () =>
      import('./pages/abm-container/abm-container.component').then(
        (m) => m.AbmContainerComponent
      ),
      canActivate: [adminGuard],
  },
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'bienvenida',
  },
];
