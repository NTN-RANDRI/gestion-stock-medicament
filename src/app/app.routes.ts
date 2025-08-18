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
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './features/admin/guards/admin.guard';
import { saleGuard } from './features/sale/guards/sale.guard';
import { gsGuard } from './features/gestion-stock/guards/gs.guard';
import { UnauthorizedPageComponent } from './core/components/unauthorized-page/unauthorized-page.component';
import { AccueilPageComponent } from './features/accueil/pages/accueil-page/accueil-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AccueilPageComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent
  },
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
    component: SalePageComponent,
    canActivate: [authGuard, saleGuard],
  },
  {
    path: 'gestion-stock',
    component: GestionStockPageComponent,
    canActivate: [authGuard, gsGuard],
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
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        component: DashboardPageComponent
      },
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
