import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SaleMedicamentModel } from '../../models/sale-medicament.model';
import { SaleSearchMedicamentModel } from '../../models/sale-search-medicament.model';
import { SelectWithSearchComponent } from "../../../../components/select-with-search/select-with-search.component";

@Component({
  selector: 'app-sale-search',
  imports: [CommonModule, FormsModule, SelectWithSearchComponent],
  templateUrl: './sale-search.component.html',
  styleUrl: './sale-search.component.css'
})
export class SaleSearchComponent {
  @Output() searchEvent = new EventEmitter<SaleSearchMedicamentModel>();

  // recherche
  protected search() {
    const data: SaleSearchMedicamentModel = {
      nomMedicament: this.nomMedicament,
      formeMedicament: this.formeMedicament,
      dosageMedicament: this.dosageMedicament,
      prixMinVenteMedicament: this.prixMinMedicament,
      prixMaxVenteMedicament: this.prixMaxMedicament
    }
    this.searchEvent.emit(data);
  }

  // search medicament
  protected nomMedicament: string = '';

  // search forme
  protected showSelectForme: boolean = false;
  protected formes: string[] = ['Comprimé', 'Liquide', 'Gélule', 'Crème', 'Injectable'];
  protected formeSelected: string | null = null;
  protected formeMedicament: string = '';

  protected changeSelected(forme: string) {
    this.formeSelected = forme;
    this.formeMedicament = forme;
  }

  protected blurInputSearchForme() {
    this.showSelectForme = false;

    if (this.formeMedicament.length === 0) {
      this.changeSelected('');
    }

    this.formeMedicament = this.formeSelected ?? '';
  }

  // search dosage
  protected dosageMedicament: string = '';

  // search prix minimum
  protected prixMinMedicament: number | null = null;

  protected verificationPrixMinMedicament() {
    if (this.prixMinMedicament === null) return;

    this.prixMinMedicament = this.prixMinMedicament >= 0 ? Math.round(this.prixMinMedicament) : null;
  }

    // search prix maximum
    protected prixMaxMedicament: number | null = null;

    protected verificationPrixMaxMedicament() {
      if (this.prixMaxMedicament === null) return;

      this.prixMaxMedicament = this.prixMaxMedicament >= 0 ? Math.round(this.prixMaxMedicament) : null;
    }

}
