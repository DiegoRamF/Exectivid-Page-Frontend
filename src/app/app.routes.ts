import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import( './exectivid/pages/home/home' ),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
