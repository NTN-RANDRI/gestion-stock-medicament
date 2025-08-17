import { SelectWithSearchComponent } from '@/app/components/select-with-search/select-with-search.component';
import { ApiMedicamentService } from '@/app/core/api/api-medicament.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { NsMedicamentModel } from '../../models/ns-medicament.model';

@Component({
  selector: 'app-ns-crud-form',
  imports: [ReactiveFormsModule, CommonModule, SelectWithSearchComponent],
  templateUrl: './ns-crud-form.component.html',
  styleUrl: './ns-crud-form.component.css',
})
export class NsCrudFormComponent implements OnInit, OnDestroy {
  protected _selected!: NsMedicamentModel | null;
  protected medicamentFormData!: FormGroup
  @Input()
  set selected(value: NsMedicamentModel | null) {
    this._selected = value;

    this.medicamentFormData = new FormGroup({
      quantite: new FormControl(value?.quantite || '', [Validators.required, Validators.min(1)]),
      datePeremptionMedicament: new FormControl(value?.datePeremptionMedicament || '', [Validators.required]),
      prixUnitaire: new FormControl(value?.prixUnitaire || '', [Validators.required]),
      nomMedicament: new FormControl(value?.nomMedicament || '', [Validators.required]),
    });

  };
  get selected(): NsMedicamentModel | null {
    return this._selected;
  }

  @Output() addEvent = new EventEmitter<NsMedicamentModel>();
  @Output() editEvent = new EventEmitter<NsMedicamentModel>();
  @Output() cancelEvent = new EventEmitter<void>();

  protected nomMedicaments: string[] = [];

  // injection
  private apiMedicament = inject(ApiMedicamentService);
  // private fb = inject(FormBuilder);

  // subscription
  private loadMedicamentSubscription: Subscription | null = null;


  protected cancel() {
    this.cancelEvent.emit();
  }

  protected submit(event: Event) {
    event.preventDefault();
    this.medicamentFormData.markAllAsTouched();

    if (this.medicamentFormData.valid) {
      const data = this.medicamentFormData.value as NsMedicamentModel;

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

  ngOnInit(): void {
    this.loadMedicamentSubscription = this.apiMedicament
      .getAll()
      .pipe(
        map((data) => {
          this.nomMedicaments = data.map((item) => item.nom);
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.loadMedicamentSubscription?.unsubscribe();
  }
}
