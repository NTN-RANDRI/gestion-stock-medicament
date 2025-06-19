import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SaleCartMedicamentModel } from '../../models/sale-cart-medicament.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-cart',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sale-cart.component.html',
  styleUrl: './sale-cart.component.css'
})
export class SaleCartComponent {
  private _cart!: SaleCartMedicamentModel[];
  protected prixTotal!: number;

  public resetForm(): void {
    this.nomClient.reset();
  }

  @Input() set cart(value: SaleCartMedicamentModel[]) {
    this._cart = value;
    this.prixTotal = value.reduce(
      (total, medicament) => total + medicament.prixMedicament * medicament.quantite,
      0
    )
  }
  get cart(): SaleCartMedicamentModel[] {
    return this._cart;
  }

  @Output() removeEvent = new EventEmitter<number>();
  @Output() envoiDemandeEvent = new EventEmitter<string>();

  protected nomClient = new FormControl('', [Validators.required]);

  protected envoiDemande(event: Event) {
    event.preventDefault();

    if (this.nomClient.invalid) {
      this.nomClient.markAsTouched();
      return;
    }

    const data = this.nomClient.value as string;

    this.envoiDemandeEvent.emit(data);
  }

  protected remove(id: number) {
    this.removeEvent.emit(id);
  }
}

