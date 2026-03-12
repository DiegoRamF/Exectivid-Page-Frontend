import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumesService } from '@services/album.service';
import { SongsService } from '@services/songs.service';

@Component({
  selector: 'song-list',
  imports: [RouterLink],
  templateUrl: './song-list.html',
})
export default class SongList {
  albumesService = inject(AlbumesService);
  songsService = inject(SongsService);
  route = inject(ActivatedRoute);

  albumSlug = toSignal<string>(
    this.route.params
      .pipe(
        map(params => params['albumSlug']),
        // tap(console.log)
      ),
  );

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

  songsResource = rxResource({
    params: () => ({id: this.albumId()}),
    stream: ({params}) => {
      if ( params.id === undefined) return of(undefined)

      return this.songsService.getSongs(params.id)
        // .pipe(
        //   tap(console.log)
        // )
    }
  })

  albumInfo = computed(() => this.albumResource.value())
  songInfo = computed(() => this.songsResource.value())
};
