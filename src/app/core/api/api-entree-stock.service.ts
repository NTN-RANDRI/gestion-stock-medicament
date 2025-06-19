import { NsEntreeStockModel } from '@/app/features/new-stock/models/ns-entree-stock.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiEntreeStockService {
  private URL: string = 'http://localhost:5006/api/entreStock';

  private http = inject(HttpClient);

  public create(data: NsEntreeStockModel): Observable<boolean> {
    return this.http
      .post(this.URL, data)
      .pipe(
        map(_ => {
          return true;
        })
      )
  }

}
