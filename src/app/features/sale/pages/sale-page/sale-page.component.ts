import { Component, inject, ViewChild } from '@angular/core';
import { SaleHeaderComponent } from '../../components/sale-header/sale-header.component';
import { SaleSearchComponent } from '../../components/sale-search/sale-search.component';
import { SaleMedicamentCardComponent } from '../../components/sale-medicament-card/sale-medicament-card.component';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { SaleCartComponent } from '../../components/sale-cart/sale-cart.component';
import { SaleSearchMedicamentModel } from '../../models/sale-search-medicament.model';
import { SaleCartMedicamentModel } from '../../models/sale-cart-medicament.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-page',
  imports: [
    SaleHeaderComponent,
    SaleSearchComponent,
    SaleMedicamentCardComponent,
    SaleCartComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sale-page.component.html',
  styleUrl: './sale-page.component.css',
})
export class SalePageComponent {
  protected saleService = inject(SaleService);

  // envoi demande
  @ViewChild(SaleCartComponent) saleCartComponent!: SaleCartComponent;
  protected envoiDemande(nomClient: string) {
    if (this.saleService.envoiDemande(nomClient)) {
      this.saleCartComponent.resetForm();
      this.saleService.resetCart();
      this.saleService.loadMedicaments();
      alert('demande envoyé avec success');
    }
  }

  // recherche
  protected search(data: SaleSearchMedicamentModel) {
    this.saleService.searchData.set(data);
  }

  // panier

  protected addToCart(data: SaleCartMedicamentModel) {
    this.saleService.addToCart(data);
  }

  protected removeToCart(id: number) {
    this.saleService.removeToCart(id);
  }
}
