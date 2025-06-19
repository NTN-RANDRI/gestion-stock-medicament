import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected delete() {
    this.deleteEvent.emit();
  }

  protected cancel() {
    this.cancelEvent.emit();
  }

}
