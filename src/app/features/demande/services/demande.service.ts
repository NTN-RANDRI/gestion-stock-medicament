import { ApiDemandeService } from '@/app/core/api/api-demande.service';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, pipe, tap } from 'rxjs';
import { DemandeModel } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  public demandes = signal<DemandeModel[]>([]);

  private apiDemandeService = inject(ApiDemandeService);

  public loadDemande(): Observable<boolean> {
    return this.apiDemandeService
      .getAll()
      .pipe(
        tap({
          next: (data) => {
            this.demandes.set(data);
          },
          error: (error) => console.error('Error loading demandes:', error),
        }),
        map(_ => {
          return true;
        })
      );
  }

}
