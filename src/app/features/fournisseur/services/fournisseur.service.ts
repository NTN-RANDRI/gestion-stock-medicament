import { computed, inject, Injectable, signal } from '@angular/core';
import { FournisseurModel } from '../models/fournisseur.model';
import { ApiFournisseurService } from '@/app/core/api/api-fournisseur.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private fournisseurs = signal<FournisseurModel[]>([]);
  public fournisseursFiltered = computed(() => this.filter());

  public search = signal<string>('');

  private apiFournisseur = inject(ApiFournisseurService);

  public loadFournisseur(): Observable<boolean> {
    return this.apiFournisseur.getAll().pipe(
      map(data => {
        this.fournisseurs.set(data);
        return true;
      })
    )
  }

  public addFournisseur(data: FournisseurModel): Observable<boolean> {
    return this.apiFournisseur.create(data).pipe(
      map(data => {
        this.fournisseurs.update(prev => [...prev, data]);
        return true;
      })
    )
  }

  public editFournisseur(id: number, data: FournisseurModel): Observable<boolean> {
    return this.apiFournisseur.update(id, data).pipe(
      map(data => {
        this.fournisseurs.update(prev => prev.map(item => item.id === id ? data : item));
        return true;
      })
    )
  }

  public deleteFournisseur(id: number): Observable<boolean> {
    return this.apiFournisseur.delete(id).pipe(
      map(_ => {
        this.fournisseurs.update(prev => prev.filter(item => item.id !== id));
        return true;
      })
    )
  }

  private filter(): FournisseurModel[] {
    let filtered = this.fournisseurs();

    if (this.search() !== '') {
      const search = this.search().toLowerCase() as string;

      filtered = filtered.filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

}
