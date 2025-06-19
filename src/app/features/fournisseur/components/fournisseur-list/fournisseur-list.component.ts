import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FournisseurModel } from '../../models/fournisseur.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fournisseur-list',
  imports: [CommonModule],
  templateUrl: './fournisseur-list.component.html',
  styleUrl: './fournisseur-list.component.css'
})
export class FournisseurListComponent {
  @Input({required: true}) fournisseurs!: FournisseurModel[];

  @Output() editEvent = new EventEmitter<FournisseurModel>();
  @Output() deleteEvent = new EventEmitter<FournisseurModel>();

  protected edit(data: FournisseurModel) {
    this.editEvent.emit(data);
  }

  protected delete(data: FournisseurModel) {
    this.deleteEvent.emit(data);
  }


}
