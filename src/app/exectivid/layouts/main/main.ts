import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SideBar } from "@components/side-bar/side-bar";

@Component({
  selector: 'main',
  imports: [RouterOutlet, SideBar] ,
  templateUrl: './main.html',
})
export default class Main {}
