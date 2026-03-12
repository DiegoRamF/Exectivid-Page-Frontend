import { Routes } from '@angular/router';

export const albumRoute: Routes = [
  {
    path: 'album/:albumSlug',
    loadComponent: () => import('./song-list/song-list'),
  },
  {
    path: 'album/:albumSlug/:songSlug',
    loadComponent: () => import('./song-list/lyrics-of-song/lyrics-of-song'),
  }
]

export default albumRoute;
