import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentModel } from '../../models/medicament.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicament-list',
  imports: [CommonModule],
  templateUrl: './medicament-list.component.html',
  styleUrl: './medicament-list.component.css'
})
export class MedicamentListComponent {
  @Input({required: true}) medicaments!: MedicamentModel[];

  @Output() editEvent = new EventEmitter<MedicamentModel>();
  @Output() deleteEvent = new EventEmitter<MedicamentModel>();

  protected edit(data: MedicamentModel) {
    this.editEvent.emit(data);
  }

  protected delete(data: MedicamentModel) {
    this.deleteEvent.emit(data);
  }

}
