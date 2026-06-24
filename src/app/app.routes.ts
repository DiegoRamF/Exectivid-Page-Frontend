import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import( './exectivid/pages/home/home' ),
  },
  {
    path: 'exectivid',
    loadComponent: () => import( './exectivid/layouts/main/main' ),
    children: [
      {
        path: 'info',
        loadComponent: () => import( './exectivid/pages/info/info' ),
      },
      {
        path: 'song-list',
        loadComponent: () => import( './exectivid/pages/song-list/song-list' ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
