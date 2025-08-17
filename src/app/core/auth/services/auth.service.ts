import { inject, Injectable } from '@angular/core';
import { ApiAuthService } from '../api/api-auth.service';
import { LoginModel } from '@/app/features/login/models/login.model';
import { Observable, map } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  public login(loginData: LoginModel): Observable<boolean> {
    return this.apiAuthService.login(loginData).pipe(
      map(response => {
        localStorage.setItem('token', response.data);

        const token = response.data;

        const decoded = jwtDecode<any>(token);

        // const email = decoded.sub;
        // const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        // const expireDate = new Date(decoded.exp * 1000);

        switch (role) {
          case 'Admin' :
            this.router.navigate(['/admin']);
            break;
          case 'Gestionnaire' :
            this.router.navigate(['/gestion-stock/new-stock']);
            break;
          case 'Réceptionniste' :
            this.router.navigate(['/sale']);
            break;
        }

        console.log(response);
        return true;
      })
    )
  }

  public logout() {
    localStorage.removeItem('token');
  }

}
