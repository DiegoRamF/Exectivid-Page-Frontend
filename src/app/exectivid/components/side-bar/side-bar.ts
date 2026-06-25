import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { RouterLink } from '@angular/router';

import { AlbumesService } from '@services/albumes.service';
import { tap } from 'rxjs';


@Component({
  selector: 'side-bar',
  imports: [ RouterLink ],
  templateUrl: './side-bar.html',
})
export class SideBar {

  private albumesService = inject( AlbumesService );

  //* Funcionalidad solo en teléfonos:

  //* Esto es solo un signal con estado inicial en false.
  //? En el código esto indicará que el side-bar siempre estará cerrado inicialmente.
  isSidebarOpen = signal( false );

  //* Un método que cambia el estado del signal a su opuesto.
  //? En el código esto es lo que da la funcionalidad de abrir o cerrar el side-bar.
  toggleSidebar() {
    this.isSidebarOpen.update(estado => !estado);
  };



  albumesResource = rxResource({
    stream: () => this.albumesService.getAlbumes()
      .pipe(
        tap( console.log ),
      ),
  });

  albumes = computed( () => this.albumesResource.value() )

};
