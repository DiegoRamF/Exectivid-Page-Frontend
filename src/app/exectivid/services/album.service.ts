import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album } from '@interfaces/album-interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumesService {

  private http = inject(HttpClient);

  getAlbumes(): Observable<Album[]> {
    return this.http.get<Album[]>('data/albumes.json');
  };

  getAlbumBySlug(slug: string | undefined): Observable<Album | undefined> {
    return this.http.get<Album[]>('data/albumes.json')
      .pipe(
        map(albumes => albumes.find(album => album.slug === slug)),
        // tap(console.log),
      );
  };
}
