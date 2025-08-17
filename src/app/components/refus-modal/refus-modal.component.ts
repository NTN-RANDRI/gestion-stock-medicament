import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refus-modal',
  imports: [],
  templateUrl: './refus-modal.component.html',
  styleUrl: './refus-modal.component.css'
})
export class RefusModalComponent {
  @Input() title: string = "Confirmation de refus";
  @Input() question: string = 'Êtes-vous sûr de vouloir refuser cette demande ?';
  @Input() text: string = 'Cette action ne peut pas être annulée.';


  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected confirm() {
    this.confirmEvent.emit();
  }

  protected cancel() {
    this.cancelEvent.emit();
  }
}
