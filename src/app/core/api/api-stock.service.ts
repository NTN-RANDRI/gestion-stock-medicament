import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SaleMedicamentModel } from '@/app/features/sale/models/sale-medicament.model';

@Injectable({
  providedIn: 'root',
})
export class ApiStockService {
  private URL: string = 'http://localhost:5006/api/stock';

  private http = inject(HttpClient);

  public getAll(): Observable<SaleMedicamentModel[]> {
    return this.http
      .get<{ data: SaleMedicamentModel[] }>(this.URL)
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }

  public getAllGroupBy(): Observable<SaleMedicamentModel[]> {
    return this.http
      .get<{ data: SaleMedicamentModel[] }>(this.URL + '/groupBy')
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }
}
