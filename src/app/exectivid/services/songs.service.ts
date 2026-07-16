import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Song } from '@interfaces/song.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {

  private http = inject( HttpClient );

  getSongs( albumId: number | undefined ): Observable<Song[]> {
    return this.http.get<Song[]>( `data/songs-data/${albumId}.json` );
  };

  getSongById( albumId: number | undefined, songSlug: string | undefined ): Observable<Song | undefined> {
    return this.getSongs( albumId )
      .pipe(
        map( songs => songs.find( song => song.slug === songSlug ) ),
      );
  };

};
