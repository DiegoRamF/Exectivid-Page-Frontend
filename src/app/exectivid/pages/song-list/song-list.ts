import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';

import { AlbumesService } from '../../services/albumes.service';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'song-list',
  imports: [],
  templateUrl: './song-list.html',
})
export default class SongList {

  private albumesService = inject( AlbumesService );
  private songsService = inject( SongsService );
  private route = inject( ActivatedRoute )

  albumSlug = toSignal<string>(
    this.route.params
    .pipe(
      map( params => params[ 'albumSlug' ] )
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
    params: () => ({ id: this.albumId() }),
    stream: ({ params }) => {
      if( params.id === undefined ) return of( undefined );
      return this.songsService.getSongs( params.id );
    },
  });

  albumInfo = computed( () => this.albumResource.value() );
  songInfo = computed( () => this.songResource.value() );

};
