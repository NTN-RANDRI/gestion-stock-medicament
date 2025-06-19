import { DemandeModel } from '@/app/features/demande/models/demande.model';
import { SaleDemandeModel } from '@/app/features/sale/models/sale-demande.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDemandeService {
  private URL: string = 'http://localhost:5006/api/demande';

  private http = inject(HttpClient);

  public getAll(): Observable<DemandeModel[]> {
    return this.http.get(this.URL).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public getById(id: number): Observable<DemandeModel> {
    return this.http.get(`${this.URL}/${id}`).pipe(
      map((response: any) => {
        return response.data;
      })
    )
  }

  public create(data: SaleDemandeModel): Observable<DemandeModel> {
    return this.http.post(this.URL, data).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }


}
