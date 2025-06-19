import { MedicamentModel } from '@/app/features/medicament/models/medicament.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMedicamentService {
  private URL: string = 'http://localhost:5006/api/medicament';

  private http = inject(HttpClient);

  public getAll(): Observable<MedicamentModel[]> {
    return this.http.get(this.URL).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public create(data: MedicamentModel): Observable<MedicamentModel> {
    return this.http.post(this.URL, data).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public update(id: number, data: MedicamentModel): Observable<MedicamentModel> {
    return this.http.put(`${this.URL}/${id}`, data).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.URL}/${id}`).pipe(
      map((response: any) => {
        return true;
      })
    )
  }

}
