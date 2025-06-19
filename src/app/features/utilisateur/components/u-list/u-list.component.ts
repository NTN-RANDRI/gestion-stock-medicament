import { Component, Input } from '@angular/core';
import { UtilisateurModel } from '../../models/utilisateur.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-u-list',
  imports: [CommonModule],
  templateUrl: './u-list.component.html',
  styleUrl: './u-list.component.css'
})
export class UListComponent {
  @Input({required: true}) users!: UtilisateurModel[];

}
