import { Component, inject } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { AlbumesService } from '../../services/albumes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lyrics',
  imports: [],
  templateUrl: './lyrics.html',
})
export default class Lyrics {

  private albumesService = inject( AlbumesService );
  private songsService = inject( SongsService );
  private route = inject( ActivatedRoute );


};
