import { computed, inject, Injectable, signal } from '@angular/core';
import { MedicamentModel } from '../models/medicament.model';
import { ApiMedicamentService } from '@/app/core/api/api-medicament.service';
import { map, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  private medicaments = signal<MedicamentModel[]>([]);
  public medicamentsFiltered = computed(() => this.filter());

  // control search
  public search = signal<string>('');
  public formeSearch = signal<string>('');

  private apiMedicament = inject(ApiMedicamentService);

  public loadMedicament(): Observable<boolean> {
    return this.apiMedicament.getAll().pipe(
      map(data => {
        this.medicaments.set(data);
        return true;
      })
    )
  }

  private filter(): MedicamentModel[] {
    let filtered = this.medicaments();

    if (this.search() !== '') {
      const search = this.search().toLowerCase() as string;

      filtered = filtered.filter(med =>
        med.nom.toLowerCase().includes(search)
      );
    }

    if (this.formeSearch() !== '') {
      const formeSearch = this.formeSearch().toLowerCase() as string;

      filtered = filtered.filter(med =>
        med.forme.toLowerCase().includes(formeSearch)
      );
    }

    return filtered;
  }

  public addMedicament(data: MedicamentModel): Observable<boolean> {
    return this.apiMedicament.create(data).pipe(
      map(data => {
        this.medicaments.update(prev => [...prev, data]);
        return true;
      })
    )
  }

  public editMedicament(id: number, data: MedicamentModel): Observable<boolean> {
    return this.apiMedicament.update(id, data).pipe(
      map(data => {
        this.medicaments.update(prev => prev.map(item => item.id === id ? data : item));
        return true;
      })
    )
  }

  public deleteMedicament(id: number): Observable<boolean> {
    return this.apiMedicament.delete(id).pipe(
      map(_ => {
        this.medicaments.update(prev => prev.filter(item => item.id !== id));
        return true;
      })
    )
  }

}
