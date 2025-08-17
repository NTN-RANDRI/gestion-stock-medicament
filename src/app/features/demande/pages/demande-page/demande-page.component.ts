import { FormatService } from '@/app/core/services/format.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DemandeModel } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DemandeSearchComponent } from '../../components/demande-search/demande-search.component';
import { FormsModule } from '@angular/forms';
import { LignesDemandeModel } from '../../models/lignes-demande.model';

@Component({
  selector: 'app-demande-page',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './demande-page.component.html',
  styleUrl: './demande-page.component.css'
})
export class DemandePageComponent implements OnInit, OnDestroy {
  // subscribtion
  private loadDemandeSubscription: Subscription | null = null;

  protected formatService = inject(FormatService);
  protected demandeService = inject(DemandeService);

  get demandes(): DemandeModel[] {
    return this.demandeService.demandesFiltered();
  }

  getTotalQuantite(demande: DemandeModel) {
    return demande.lignesDemande
      ? demande.lignesDemande.reduce((sum: number, item: LignesDemandeModel) => sum + item.quantite, 0)
      : 0;
  }

  textStatut(statut: string): string {
    switch (statut) {
      case 'EnAttente':
        return 'En attente';
      case 'Acceptee':
        return 'Livrer';
      case 'Annulee':
        return 'Refuser';
      default:
        return statut;
    }
  }

  couleurStatut(statut: string): string {
    switch (statut) {
      case 'EnAttente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Acceptee':
        return 'bg-green-100 text-green-800';
      case 'Annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  ngOnInit(): void {
    this.loadDemandeSubscription = this.demandeService.loadDemande().subscribe();
  }

  ngOnDestroy(): void {
    this.loadDemandeSubscription?.unsubscribe();
  }

}
