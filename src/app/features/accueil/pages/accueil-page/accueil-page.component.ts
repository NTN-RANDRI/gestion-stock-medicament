import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil-page',
  imports: [RouterLink],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.css'
})
export class AccueilPageComponent {
  protected email = "randrianambinintsoa43@gmail.com";

}
