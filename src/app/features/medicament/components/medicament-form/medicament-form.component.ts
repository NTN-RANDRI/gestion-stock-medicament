import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentModel } from '../../models/medicament.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectWithSearchComponent } from "../../../../components/select-with-search/select-with-search.component";

@Component({
  selector: 'app-medicament-form',
  imports: [ReactiveFormsModule, CommonModule, SelectWithSearchComponent],
  templateUrl: './medicament-form.component.html',
  styleUrl: './medicament-form.component.css'
})
export class MedicamentFormComponent {
  @Input({required: true}) formes!: string[];
  private _selected!: MedicamentModel | null;
  protected medicamentFormData!: FormGroup;
  @Input({required: true})
  set selected(value: MedicamentModel | null) {
    this._selected = value;

    this.medicamentFormData = new FormGroup({
      nom: new FormControl(value?.nom || '', [Validators.required]),
      description: new FormControl(value?.description || '', [Validators.required]),
      forme: new FormControl(value?.forme || '', [Validators.required]),
      dosage: new FormControl(value?.dosage || '', [Validators.required]),
      prixVente: new FormControl(value?.prixVente || null, [Validators.required]),
    });
  };
  get selected(): MedicamentModel | null {
    return this._selected;
  }

  @Output() addEvent = new EventEmitter<MedicamentModel>();
  @Output() editEvent = new EventEmitter<MedicamentModel>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected cancel() {
    this.cancelEvent.emit();
  }

  protected submit(event: Event) {
    event.preventDefault();
    this.medicamentFormData.markAllAsTouched();

    if (this.medicamentFormData.valid) {
      const data = this.medicamentFormData.value as MedicamentModel;

      if (this.selected === null) {
        this.addEvent.emit(data);
      } else {
        this.editEvent.emit(data);
      }

    }
  }

  protected isInvalid(name: string) {
    return this.medicamentFormData.get(name)?.invalid && this.medicamentFormData.get(name)?.touched;
  }

  protected hasError(name: string, type: string) {
    return this.medicamentFormData.get(name)?.hasError(type);
  }

}
