import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() title: string = "Confirmation d'action";
  @Input() question: string = "Êtes-vous sûr de vouloir effectuer cette action ?";
  @Input() text: string = "Veuillez vérifier que toutes les informations sont correctes avant de confirmer.";


  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected confirm() {
    this.confirmEvent.emit();
  }

  protected cancel() {
    this.cancelEvent.emit();
  }

}
