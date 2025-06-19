import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page/login-page.component';
import { SalePageComponent } from './features/sale/pages/sale-page/sale-page.component';
import { GestionStockPageComponent } from './features/gestion-stock/pages/gestion-stock-page/gestion-stock-page.component';
import { NewStockPageComponent } from './features/new-stock/pages/new-stock-page/new-stock-page.component';
import { DemandePageComponent } from './features/demande/pages/demande-page/demande-page.component';
import { DemandeDetailPageComponent } from './features/demande/pages/demande-detail-page/demande-detail-page.component';
import { AdminPageComponent } from './features/admin/pages/admin-page/admin-page.component';
import { MedicamentPageComponent } from './features/medicament/pages/medicament-page/medicament-page.component';
import { FournisseurPageComponent } from './features/fournisseur/pages/fournisseur-page/fournisseur-page.component';
import { UtilisateurPageComponent } from './features/utilisateur/pages/utilisateur-page/utilisateur-page.component';
import { RegisterPageComponent } from './features/register/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'sale',
    component: SalePageComponent
  },
  {
    path: 'gestion-stock',
    component: GestionStockPageComponent,
    children: [
      {
        path: 'demande',
        component: DemandePageComponent
      },
      {
        path: 'demande/:id',
        component: DemandeDetailPageComponent
      },
      {
        path: 'new-stock',
        component: NewStockPageComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'medicament',
        component: MedicamentPageComponent
      },
      {
        path: 'fournisseur',
        component: FournisseurPageComponent
      },
      {
        path: 'utilisateur',
        component: UtilisateurPageComponent
      }
    ]
  }
];
