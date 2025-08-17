import { ApiUserService } from '@/app/core/api/api-user.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UtilisateurModel } from '../models/utilisateur.model';
import { map, Observable } from 'rxjs';
import { ApiAuthService } from '@/app/core/auth/api/api-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private utilisateurs = signal<UtilisateurModel[]>([]);
  public utilisateursFiltered = computed(() => this.filter());

  public search = signal<string>('');
  public roleSearch = signal<string>('tous');
  public etatSearch = signal<string>('attente');

  private apiUtilisateur = inject(ApiUserService);
  private apiAuth = inject(ApiAuthService);

  public loadUtilisateur(): Observable<boolean> {
    return this.apiUtilisateur.getAll().pipe(
      map((data) => {
        this.utilisateurs.set(data);
        return true;
      }),
    );
  }

  private filter(): UtilisateurModel[] {
    let filtered = this.utilisateurs();

    if (this.search() !== '') {
      const search = this.search().toLowerCase() as string;

      filtered = filtered.filter(
        (user) =>
          user.nom.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search),
      );
    }

    if (this.roleSearch() !== 'tous') {
      const roleSearch = this.roleSearch() as string;

      filtered = filtered.filter((user) =>
        user.role.toLowerCase().includes(roleSearch),
      );
    }

    if (this.etatSearch() !== 'tous') {
      const etatSearch = this.etatSearch() as string;

      if (etatSearch === 'approuve') {
        filtered = filtered.filter((user) => user.etat);
      }

      if (etatSearch === 'attente') {
        filtered = filtered.filter((user) => !user.etat);
      }
    }

    return filtered;
  }

  public accepter(id: number): Observable<boolean> {
    return this.apiAuth.updateUtilisateurEtat(id, true).pipe(
      map(_ => {
        this.utilisateurs.update(users =>
          users.map(u =>
            u.id === id ? { ...u, etat: true } : u
          )
        );
        return true;
      })
    )
  }

  public refuser(id: number): Observable<boolean> {
    return this.apiAuth.updateUtilisateurEtat(id, false).pipe(
      map(_ => {
        return true;
      })
    )
  }

}
