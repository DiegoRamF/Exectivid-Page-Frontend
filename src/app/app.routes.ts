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
        path: 'album/:albumSlug',
        loadComponent: () => import( './exectivid/pages/song-list/song-list' ),
      },
      {
        path: 'album/:albumSlug/:songSlug',
        loadComponent: () => import( './exectivid/pages/lyrics/lyrics' ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
