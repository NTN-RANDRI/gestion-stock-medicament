import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isLoggedIn()) {
    return true; // accès autorisé si token présent
  } else {
    router.navigate(['/login']); // redirection si non connecté
    return false;
  }
};
