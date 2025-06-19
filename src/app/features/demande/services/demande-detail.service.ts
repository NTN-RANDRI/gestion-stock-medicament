import { computed, inject, Injectable, signal } from '@angular/core';
import { DemandeModel } from '../models/demande.model';
import { ApiDemandeService } from '@/app/core/api/api-demande.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeDetailService {

  public demande = signal<DemandeModel | null>(null);
  public valeur = computed(() => this.demande()?.lignesDemande.reduce((sum, item) => sum + item.prixTotal, 0));

  private apiDemandeService = inject(ApiDemandeService);

  public loadDemandeById(id: number): Observable<boolean> {
    return this.apiDemandeService.getById(id).pipe(
      tap({
        next: (data) => {
          this.demande.set(data);

        },
        error: (error) => console.error('Error loading demande by id:', error),
      }),
      map(_ => {
        return true;
      })
    )
  }

}
