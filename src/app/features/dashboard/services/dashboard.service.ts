import { computed, inject, Injectable, signal } from '@angular/core';
import { MedicamentModel } from '../../medicament/models/medicament.model';
import { ApiMedicamentService } from '@/app/core/api/api-medicament.service';
import { map, Observable } from 'rxjs';
import { ApiStockService } from '@/app/core/api/api-stock.service';
import { SaleMedicamentModel } from '../../sale/models/sale-medicament.model';
import { ApiDemandeService } from '@/app/core/api/api-demande.service';
import { DemandeModel } from '../../demande/models/demande.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // var public
  public totalStock = computed(() => this.nombreTotalQuantiteStock());
  public totalPerimes = computed(() => this.nombreTotalMedicamentPerimes());
  public totalDemandeMois = computed(() => this.nombreDemandeMois());
  public stockBientotPerimes = computed(() => this.filtreStockBientotPerimes());

  // var private
  private medicaments = signal<MedicamentModel[]>([]);
  private stocks = signal<SaleMedicamentModel[]>([]);
  private demandes = signal<DemandeModel[]>([]);

  // var private readonly
  private readonly TODAY = new Date();
  private readonly MOIS_ACTUEL = this.TODAY.getMonth();
  // private readonly MOIS_DERNIER = this.TODAY.getMonth() === 0 ? 11 : this.TODAY.getMonth() - 1;
  private readonly ANNEE_ACTUELLE = this.TODAY.getFullYear();

  // injection
  private apiMedicament = inject(ApiMedicamentService);
  private apiStock = inject(ApiStockService);
  private apiDemande = inject(ApiDemandeService);

  // func public
  public loadDemande(): Observable<boolean> {
    return this.apiDemande.getAll().pipe(
      map((data) => {
        this.demandes.set(data);
        // console.log(data);
        return true;
      }),
    );
  }

  public loadStock(): Observable<boolean> {
    return this.apiStock.getAll().pipe(
      map((data) => {
        this.stocks.set(data);
        // console.log(data);
        return true;
      }),
    );
  }

  public loadMedicament(): Observable<boolean> {
    return this.apiMedicament.getAll().pipe(
      map((data) => {
        this.medicaments.set(data);
        // console.log(data);
        return true;
      }),
    );
  }

  // func private
  private nombreTotalQuantiteStock(): number {
    return this.stocks().reduce((sum, item) => sum + item.quantite, 0);
  }

  // private nombreTotalQuantiteStockInDay(date: Date): number {
  //   return this.stocks().filter(item => {
  //     const stockDate = new Date(item.)
  //   })
  // }

  private nombreTotalMedicamentPerimes(): number {
    return this.stocks().filter(
      (med) => new Date(med.datePeremption) < this.TODAY,
    ).length;
  }

  private nombreDemandeMois(): number {
    return this.demandes().filter((d) => {
      const dateDemande = new Date(d.dateDemande);
      return (
        dateDemande.getMonth() === this.MOIS_ACTUEL &&
        dateDemande.getFullYear() === this.ANNEE_ACTUELLE
      );
    }).length;
  }

  private filtreStockBientotPerimes(): SaleMedicamentModel[] {
    const alertDays = 30;
    const soon = new Date(new Date(this.TODAY).setDate(this.TODAY.getDate() + alertDays));

    return this.stocks().filter(med => {
      const datePeremption = new Date(med.datePeremption);
      return datePeremption >= this.TODAY && datePeremption <= soon;
    })
  }
}
