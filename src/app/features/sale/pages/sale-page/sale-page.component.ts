import { Component, inject, ViewChild } from '@angular/core';
import { SaleHeaderComponent } from '../../components/sale-header/sale-header.component';
import { SaleSearchComponent } from '../../components/sale-search/sale-search.component';
import { SaleMedicamentCardComponent } from '../../components/sale-medicament-card/sale-medicament-card.component';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { SaleCartComponent } from '../../components/sale-cart/sale-cart.component';
import { SaleSearchMedicamentModel } from '../../models/sale-search-medicament.model';
import { SaleCartMedicamentModel } from '../../models/sale-cart-medicament.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfileComponent } from "@/app/components/profile/profile.component";

@Component({
  selector: 'app-sale-page',
  imports: [
    SaleMedicamentCardComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileComponent
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
      this.showPanier = false;

      Swal.fire({
        title: "Commande effectué avec succès!",
        icon: "success",
        draggable: true
      });
    }
  }

  // recherche
  protected search(data: SaleSearchMedicamentModel) {
    this.saleService.searchData.set(data);
  }

  // panier
  protected showPanier = false;

  protected addToCart(data: SaleCartMedicamentModel) {
    this.saleService.addToCart(data);
  }

  protected removeToCart(id: number) {
    this.saleService.removeToCart(id);
  }
}
