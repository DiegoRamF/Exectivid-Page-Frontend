import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Song } from '@interfaces/song-interfaces';
import { AlbumesService } from '@services/album.service';
import { SongsService } from '@services/songs.service';
import { map, of, tap } from 'rxjs';

@Component({
  selector: 'lyrics-of-song',
  imports: [],
  templateUrl: './lyrics-of-song.html',
})
export default class LyricsOfSong {
  route = inject(ActivatedRoute)
  songsService = inject(SongsService);
  albumesService = inject(AlbumesService)

  albumSlug = toSignal<string>(
    this.route.params
      .pipe(
        map(params => params['albumSlug']),
        // tap(console.log)
      ),
  );

  songSlug = toSignal<string>(
    this.route.params
      .pipe(
        map(params => params['songSlug']),
        // tap(console.log)
      )
  )

  albumId = computed<number | undefined>(() => {
    const album = this.albumResource.value();

    if ( !album ) return undefined;

    return album.id
  });

  albumResource = rxResource({
    params: () => ({slug: this.albumSlug()}),
    stream: ({params}) => this.albumesService.getAlbumBySlug(params.slug)
      // .pipe(
      //   tap(console.log)
      // ),
  });

  songResource = rxResource({
    params: () => ({id: this.albumId(), slug: this.songSlug()}),
    stream: ({params}) => {
      if ( !(params.id && params.slug) ) return of(undefined);

      return this.songsService.getSongById(params.id, params.slug)
        // .pipe(
        //   tap(console.log)
        // )
    },
  })


  songInfo = computed(() => this.songResource.value())
};
