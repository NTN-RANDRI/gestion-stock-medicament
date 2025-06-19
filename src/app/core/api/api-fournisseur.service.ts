import { FournisseurModel } from '@/app/features/fournisseur/models/fournisseur.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFournisseurService {
  private URL: string = 'http://localhost:5006/api/fournisseur';

  private http = inject(HttpClient);

  public getAll(): Observable<FournisseurModel[]> {
    return this.http.get(this.URL).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public create(data: FournisseurModel): Observable<FournisseurModel> {
    return this.http.post(this.URL, data).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public update(id: number, data: FournisseurModel): Observable<FournisseurModel> {
    return this.http.put(`${this.URL}/${id}`, data).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.URL}/${id}`).pipe(
      map((response: any) => {
        return true
      })
    )
  }

  // public create(data: SaleDemandeModel): Observable<any> {
  //   return this.http.post(this.URL, data).pipe(
  //     map((response: any) => {
  //       return response.data;
  //     })
  //   );
  // }


}
