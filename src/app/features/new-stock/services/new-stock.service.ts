import { inject, Injectable, signal } from '@angular/core';
import { NsMedicamentModel } from '../models/ns-medicament.model';
import { FormControl, Validators } from '@angular/forms';
import { ApiEntreeStockService } from '@/app/core/api/api-entree-stock.service';
import { NsEntreeStockModel } from '../models/ns-entree-stock.model';

@Injectable({
  providedIn: 'root'
})
export class NewStockService {
  public fournisseur = new FormControl('', Validators.required);
  public motif = new FormControl('', Validators.required);
  public entreeStock = signal<NsMedicamentModel[]>([]);

  private apiEntreeStock = inject(ApiEntreeStockService);

  // A MODIFIER
  public async saveNewStock() {
    this.entreeStock().map(item => {
      const data = {
        ...item,
        nomFournisseur: this.fournisseur.value,
        motif: this.motif.value
      } as NsEntreeStockModel;
      this.apiEntreeStock.create(data).subscribe();
    })
  }

  public addEntreeStock(data: NsMedicamentModel) {
    this.entreeStock.update(prev => [...prev, data]);
  }

  public editEntreeStock(selected: NsMedicamentModel, newData: NsMedicamentModel) {
    this.entreeStock.update(prev => prev.map(item => item === selected ? newData : item));
  }

  public deleteEntreeStock(data: NsMedicamentModel) {
    this.entreeStock.update(prev => prev.filter(item => item !== data));
  }

  public resetAll() {
    this.fournisseur.setValue('');
    this.motif.setValue('');
    this.entreeStock.set([]);
  }

}
