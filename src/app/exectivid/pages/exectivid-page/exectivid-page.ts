import { Component, computed, inject } from '@angular/core';
import { AlbumesService } from '../../services/album.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-exectivid-page',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './exectivid-page.html',
})
export default class ExectividPage {
  private albumesService = inject(AlbumesService);

  albumesResource = rxResource({
    stream: () => this.albumesService.getAlbumes()
      // .pipe(
      //   tap(console.log)
      // )
  });

  albumes = computed(() => this.albumesResource.value());

};
