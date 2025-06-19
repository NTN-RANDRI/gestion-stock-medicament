import { LoginModel } from '@/app/features/login/models/login.model';
import { registerModel } from '@/app/features/register/models/register.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private BASE_URL: string = 'http://localhost:5006/api';

  private http = inject(HttpClient);

  public login(loginData: LoginModel): Observable<any> {
    return this.http.post(this.BASE_URL + '/auth/login', loginData);
  }

  public register(registerData: registerModel): Observable<any> {
    return this.http.post(this.BASE_URL + '/auth/register', registerData);
  }

}
