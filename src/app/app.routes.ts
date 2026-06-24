import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./exectivid-antiguo/components/welcome/welcome'),
  },
  {
    path: 'exectivid',
    loadComponent: () => import('./exectivid-antiguo/pages/exectivid-page/exectivid-page'),
    loadChildren: () => import('./exectivid-antiguo/pages/album.routes'),
  },
  {
    path: '**',
    redirectTo: 'welcome',
  }
];
