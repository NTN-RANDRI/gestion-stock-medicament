import { ApiAuthService } from '@/app/core/auth/api/api-auth.service';
import { inject, Injectable } from '@angular/core';
import { registerModel } from '../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiAuth = inject(ApiAuthService);

  public register(data: registerModel): Observable<boolean> {
    return this.apiAuth.register(data);
  }

}
