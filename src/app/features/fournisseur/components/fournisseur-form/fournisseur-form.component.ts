import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FournisseurModel } from '../../models/fournisseur.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fournisseur-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fournisseur-form.component.html',
  styleUrl: './fournisseur-form.component.css'
})
export class FournisseurFormComponent {
  private _selected!: FournisseurModel | null;
  protected fournisseurFormData!: FormGroup;
  @Input({required: true})
  set selected(value: FournisseurModel | null) {
    this._selected = value;

    this.fournisseurFormData = new FormGroup({
      nom: new FormControl(value?.nom || '', [Validators.required]),
      contact: new FormControl(value?.contact || '', [Validators.required]),
      adresse: new FormControl(value?.adresse || '', [Validators.required]),
    });
  };
  get selected(): FournisseurModel | null {
    return this._selected;
  }

  @Output() addEvent = new EventEmitter<FournisseurModel>();
  @Output() editEvent = new EventEmitter<FournisseurModel>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected cancel() {
    this.cancelEvent.emit();
  }

  protected submit(event: Event) {
    event.preventDefault();
    this.fournisseurFormData.markAllAsTouched();

    if (this.fournisseurFormData.valid) {
      const data = this.fournisseurFormData.value as FournisseurModel;

      if (this.selected === null) {
        this.addEvent.emit(data);
      } else {
        this.editEvent.emit(data);
      }

    }
  }

  protected isInvalid(name: string) {
    return this.fournisseurFormData.get(name)?.invalid && this.fournisseurFormData.get(name)?.touched;
  }

  protected hasError(name: string, type: string) {
    return this.fournisseurFormData.get(name)?.hasError(type);
  }
}
