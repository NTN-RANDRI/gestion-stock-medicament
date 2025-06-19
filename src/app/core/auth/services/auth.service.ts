import { inject, Injectable } from '@angular/core';
import { ApiAuthService } from '../api/api-auth.service';
import { LoginModel } from '@/app/features/login/models/login.model';
import { Observable, map } from 'rxjs';

interface UserModel {
  id: number,
  email: string,
  nom: string,
  role: string,
  etat: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: UserModel | null = null;

  private apiAuthService = inject(ApiAuthService);

  public login(loginData: LoginModel): Observable<boolean> {
    return this.apiAuthService.login(loginData).pipe(
      map(response => {
        localStorage.setItem('token', response.data);
        console.log(response);
        return true;
      })
    )
  }

}
