import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';

import { SongsService } from '../../services/songs.service';
import { AlbumesService } from '../../services/albumes.service';

@Component({
  selector: 'lyrics',
  imports: [ RouterLink ],
  templateUrl: './lyrics.html',
})
export default class Lyrics {

  private albumesService = inject( AlbumesService );
  private songsService = inject( SongsService );
  private route = inject( ActivatedRoute );

  albumSlug = toSignal<string>(
    this.route.params
      .pipe(
        map( params => params[ 'albumSlug' ] ),
      ),
  );

  songSlug = toSignal<string>(
    this.route.params
      .pipe(
        map( params => params[ 'songSlug' ] ),
      ),
  );

  albumId = computed<number | undefined>( () => {
    const album = this.albumResource.value();
    if( !album ) return undefined;
    return album.id;
  });

  albumResource = rxResource({
    params: () => ({ slug: this.albumSlug() }),
    stream: ({ params }) => this.albumesService.getAlbumBySlug( params.slug )
  });

  songResource = rxResource({
    params: () => ({ id: this.albumId(), slug: this.songSlug() }),
    stream: ({ params }) => {
      if( !( params.id && params.slug ) ) return of( undefined );
      return this.songsService.getSongById( params.id, params.slug );
    },
  });

  albumInfo = computed( () => this.albumResource.value() );
  songInfo = computed( () => this.songResource.value() );

};
