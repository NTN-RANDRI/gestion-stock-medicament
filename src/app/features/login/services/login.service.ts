import { AuthService } from '@/app/core/auth/services/auth.service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authService  = inject(AuthService);

  public login(loginData: LoginModel): Observable<boolean> {
    return this.authService.login(loginData);
  }

}
