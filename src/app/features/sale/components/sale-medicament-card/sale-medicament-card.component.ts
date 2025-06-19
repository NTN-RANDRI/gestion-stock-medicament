import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaleMedicamentModel } from '../../models/sale-medicament.model';
import { SaleCartMedicamentModel } from '../../models/sale-cart-medicament.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-medicament-card',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sale-medicament-card.component.html',
  styleUrl: './sale-medicament-card.component.css'
})
export class SaleMedicamentCardComponent {
  private _medicament!: SaleMedicamentModel;
  protected quantite!: FormControl<number>;

  @Input() set medicament(value: SaleMedicamentModel) {
    this._medicament = value;
    this.quantite = new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(value.quantite)
      ]
    });
  }
  get medicament(): SaleMedicamentModel {
    return this._medicament;
  }

  @Output() addToCartEvent = new EventEmitter<SaleCartMedicamentModel>();

  protected addToCart(event: Event) {
    event.preventDefault();

    if (this.quantite.invalid) {
      this.quantite.markAsTouched();
      return;
    }

    const dataToAdd: SaleCartMedicamentModel = {
      id: this.medicament.id,
      nomMedicament: this.medicament.nomMedicament,
      quantite: this.quantite.value || 1,
      prixMedicament: Number(this.medicament.prixVenteMedicament)
    }

    this.addToCartEvent.emit(dataToAdd);
  }
}
