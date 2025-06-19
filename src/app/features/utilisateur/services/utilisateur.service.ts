import { ApiUserService } from '@/app/core/api/api-user.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UtilisateurModel } from '../models/utilisateur.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateurs = signal<UtilisateurModel[]>([]);
  public utilisateursFiltered = computed(() => this.filter());

  public search = signal<string>('');
  public roleSearch = signal<string>('tous');
  public etatSearch = signal<string>('tous');

  private apiUtilisateur = inject(ApiUserService);

  public loadUtilisateur(): Observable<boolean> {
    return this.apiUtilisateur.getAll().pipe(
      map(data => {
        this.utilisateurs.set(data);
        return true;
      })
    )
  }

  private filter(): UtilisateurModel[] {
    let filtered = this.utilisateurs();

    if (this.search() !== '') {
      const search = this.search().toLowerCase() as string;

      filtered = filtered.filter(user =>
        user.nom.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    if (this.roleSearch() !== 'tous') {
      const roleSearch = this.roleSearch() as string;

      filtered = filtered.filter(user =>
        user.role.toLowerCase().includes(roleSearch)
      );
    }

    if (this.etatSearch() !== 'tous') {
      const etatSearch = this.etatSearch() as string;

      if (etatSearch === 'approuve') {
        filtered = filtered.filter(user => user.etat);
      }

      if (etatSearch === 'attente') {
        filtered = filtered.filter(user => !user.etat);
      }
    }

    return filtered;
  }


}
