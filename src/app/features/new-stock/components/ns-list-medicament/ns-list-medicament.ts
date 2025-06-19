import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NsMedicamentModel } from '../../models/ns-medicament.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ns-list-medicament',
  imports: [CommonModule],
  templateUrl: './ns-list-medicament.html',
  styleUrl: './ns-list-medicament.css'
})
export class NsListMedicamentComponent {
  @Input() medicaments!: NsMedicamentModel[];

  @Output() addEvent = new EventEmitter<void>();
  @Output() editEvent = new EventEmitter<NsMedicamentModel>();
  @Output() deleteEvent = new EventEmitter<NsMedicamentModel>();

  protected add() {
    this.addEvent.emit();
  }

  protected edit(data: NsMedicamentModel) {
    this.editEvent.emit(data);
  }

  protected delete(data: NsMedicamentModel) {
    this.deleteEvent.emit(data);
  }

}
