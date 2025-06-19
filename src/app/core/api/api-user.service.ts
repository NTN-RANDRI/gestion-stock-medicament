import { UtilisateurModel } from '@/app/features/utilisateur/models/utilisateur.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private URL: string = 'http://localhost:5006/api/auth';

  private http = inject(HttpClient);

  public getAll(): Observable<UtilisateurModel[]> {
    return this.http
      .get<{ data: UtilisateurModel[] }>(this.URL)
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }

}
