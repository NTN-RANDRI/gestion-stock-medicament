import { TokenService } from '@/app/core/services/token.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const gsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isLoggedIn() && tokenService.role === 'Gestionnaire') {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
