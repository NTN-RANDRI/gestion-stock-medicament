import { ApiDemandeService } from '@/app/core/api/api-demande.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, pipe, tap } from 'rxjs';
import { DemandeModel } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private demandes = signal<DemandeModel[]>([]);
  public demandesFiltered = computed(() => this.filter());

  public search = signal<string>('');
  public searchStatus = signal<string>('EnAttente');

  private apiDemandeService = inject(ApiDemandeService);

  public loadDemande(): Observable<boolean> {
    return this.apiDemandeService
      .getAll()
      .pipe(
        map(data => {
          this.demandes.set(data);
          return true;
        })
      );
  }

  private filter(): DemandeModel[] {
    let filtered = this.demandes();

    if (this.search().trim() !== '') {
      filtered = filtered.filter(d =>
        d.nomClient.toLowerCase().trim().includes(this.search().toLowerCase().trim())
      )
    }

    if (this.searchStatus() !== 'tous') {
      filtered = filtered.filter(d =>
        d.statutDemande === this.searchStatus()
      )
    }

    return filtered;
  }

}
