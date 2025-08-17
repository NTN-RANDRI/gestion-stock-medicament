import { computed, inject, Injectable, signal } from '@angular/core';
import { SaleMedicamentModel } from '../models/sale-medicament.model';
import { tap } from 'rxjs';
import { SaleSearchMedicamentModel } from '../models/sale-search-medicament.model';
import { SaleCartMedicamentModel } from '../models/sale-cart-medicament.model';
import {
  fileteredMedicamentsProcess,
  filteredMedicamemtsGlobalProcess,
  resteMedicamentCalcul,
} from '../utils/saleServiceFunc';
import { SaleDemandeModel } from '../models/sale-demande.model';
import { ApiDemandeService } from '@/app/core/api/api-demande.service';
import { ApiStockService } from '@/app/core/api/api-stock.service';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiStockService = inject(ApiStockService);
  private apiDemandeService = inject(ApiDemandeService);

  public loadMedicaments(): void {
    this.apiStockService
      .getAllGroupBy()
      .pipe(
        tap({
          next: (data) => {
            this.medicamentsBD.set(data);
          },
          error: (error) => console.error('Error loading medicaments:', error),
        }),
      )
      .subscribe();
  }

  constructor() {
    this.loadMedicaments();
  }

  /* demande */
  public envoiDemande(nomClient: string): boolean {
    if (this.cartItems().length === 0) {
      alert('Demande non envoyé \nPanier encore vide');
      return false;
    }

    const dataDemande: SaleDemandeModel = {
      nomClient: nomClient,
      statusDemande: 1,
      lignesDemande: this.cartItems().map((item) => ({
        quantite: item.quantite,
        nomMedicament: item.nomMedicament,
      })),
    };

    this.apiDemandeService.create(dataDemande).subscribe({
      error: (error) => {
        console.error(error);
      },
    });

    return true;
  }

  /* medicaments */
  private medicamentsBD = signal<SaleMedicamentModel[]>([]);
  private resteMedicaments = computed(() => {
    return resteMedicamentCalcul(this.medicamentsBD(), this.cartItems()).filter(
      (medicament) => medicament.quantite !== 0,
    );
  });

  /* cart */
  public cartItems = signal<SaleCartMedicamentModel[]>([]);
  public addToCart(data: SaleCartMedicamentModel) {

    const isExiste = this.cartItems().some(
      (medicament) => medicament.nomMedicament === data.nomMedicament,
    );

    if (isExiste) {
      this.cartItems.update((prevCart) =>
        prevCart.map((medicament) =>
          medicament.nomMedicament === data.nomMedicament
            ? { ...medicament, quantite: medicament.quantite + data.quantite }
            : medicament,
        ),
      );
    } else {
      this.cartItems.update((prevCart) => [...prevCart, data]);
    }
  }
  public removeToCart(id: number) {
    this.cartItems.update((prevCart) =>
      prevCart.filter((medicament) => medicament.id !== id),
    );
  }

  public resetCart() {
    this.cartItems.set([]);
  }
  /* search */
  public filteredMedicaments = computed(() => {
    // return fileteredMedicamentsProcess(
    //   this.resteMedicaments(),
    //   this.searchData(),
    // );

    return filteredMedicamemtsGlobalProcess(
      this.resteMedicaments(),
      this.searchGlobal(),
    );
  });

  public searchData = signal<SaleSearchMedicamentModel>({
    nomMedicament: '',
    formeMedicament: '',
    dosageMedicament: '',
    prixMinVenteMedicament: null,
    prixMaxVenteMedicament: null,
  });

  public searchGlobal = signal<string>('');
}
