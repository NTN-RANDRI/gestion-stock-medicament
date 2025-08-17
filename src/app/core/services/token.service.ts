import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'token';

  // Récupère le token dynamiquement
  public get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   // Vérifie si l'utilisateur est connecté
  public isLoggedIn(): boolean {
    return !!this.token;
  }

  // Décode le token et retourne le payload
  private get payload(): Record<string, any> | null {
    if (!this.token) return null;
    return jwtDecode<Record<string, any>>(this.token);
  }

  // Getter pour l'email
  public get email(): string | null {
    return this.payload?.['sub'] || null;
  }

  // Getter pour l'ID utilisateur
  public get userId(): string | null {
    return this.payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  }

  // Getter pour le rôle
  public get role(): string | null {
    return this.payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

  // Getter pour la date d'expiration
  public get expirationDate(): Date | null {
    return this.payload?.['exp'] ? new Date(this.payload['exp'] * 1000) : null;
  }

}
