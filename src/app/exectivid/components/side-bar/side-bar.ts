import { Component, signal } from '@angular/core';

@Component({
  selector: 'side-bar',
  imports: [],
  templateUrl: './side-bar.html',
})
export class SideBar {

  //* Funcionalidad solo en teléfonos:

  //* Esto es solo un signal con estado inicial en false.
  //? En el código esto indicará que el side-bar siempre estará cerrado inicialmente.
  isSidebarOpen = signal( false );

  //* Un método que cambia el estado del signal a su opuesto.
  //? En el código esto es lo que da la funcionalidad de abrir o cerrar el side-bar.
  toggleSidebar() {
    this.isSidebarOpen.update(estado => !estado);
  };

};
