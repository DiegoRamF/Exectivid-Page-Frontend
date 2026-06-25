import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';



import { Album } from '@interfaces/album.interface';


@Injectable({
  providedIn: 'root',
})
export class AlbumesService {

  private http = inject( HttpClient );

  getAlbumes(): Observable<Album[]> {
    return this.http.get<Album[]>( 'data/albumes.json' )
  };

  getAlbumBySlug( slug: string | undefined ): Observable<Album | undefined> {
    return this.http.get<Album[]>( 'data/albunes.json' )
      .pipe(
        map( albumes => albumes.find( album => album.slug === slug )),
        tap( console.log ),
      );
  };

};
