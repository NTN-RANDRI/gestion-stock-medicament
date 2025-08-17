import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemandeModel } from '../../models/demande.model';
import { LignesDemandeModel } from '../../models/lignes-demande.model';
import { CommonModule } from '@angular/common';
import { DemandeDetailService } from '../../services/demande-detail.service';
import { ConfirmModalComponent } from "@/app/components/confirm-modal/confirm-modal.component";
import { RefusModalComponent } from "@/app/components/refus-modal/refus-modal.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-detail-page',
  imports: [CommonModule, ConfirmModalComponent, RefusModalComponent, RouterLink],
  templateUrl: './demande-detail-page.component.html',
  styleUrl: './demande-detail-page.component.css'
})
export class DemandeDetailPageComponent implements OnInit, OnDestroy {
  private loadDemandeByIdSubscription: Subscription | null = null;
  protected showConfirmModal = false;
  protected showRefusModal = false;

  private route = inject(ActivatedRoute);
  private demandeDetailService = inject(DemandeDetailService);

  get demande(): DemandeModel | null {
    return this.demandeDetailService.demande();
  }
  get valeur(): number {
    return this.demandeDetailService.valeur() as number;
  }

  protected confirmDemande() {
    this.demandeDetailService.confirmDemande().subscribe({
      next: _ => {
        this.showConfirmModal = false;

        Swal.fire({
          title: "Commande livrée avec succès !",
          icon: "success",
          draggable: true
        });
      }
    });
  }

  protected refuseDemande() {
    this.demandeDetailService.refuseDemande().subscribe({
      next: _ => {
        this.showRefusModal = false;

        Swal.fire({
          title: "Commande refusée avec succès !",
          icon: "success",
          draggable: true
        });
      }
    });
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
    const demandeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDemandeByIdSubscription = this.demandeDetailService.loadDemandeById(demandeId).subscribe();
  }

  ngOnDestroy(): void {
    this.loadDemandeByIdSubscription?.unsubscribe();
  }

}
