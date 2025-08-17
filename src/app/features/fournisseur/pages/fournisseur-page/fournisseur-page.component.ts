import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FournisseurListComponent } from "../../components/fournisseur-list/fournisseur-list.component";
import { FournisseurService } from '../../services/fournisseur.service';
import { FournisseurModel } from '../../models/fournisseur.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FournisseurFormComponent } from "../../components/fournisseur-form/fournisseur-form.component";
import { DeleteModalComponent } from "../../../../components/delete-modal/delete-modal.component";
import { FormsModule } from '@angular/forms';
import { Toast } from '@/app/librairie/sweetalert2/toast';

@Component({
  selector: 'app-fournisseur-page',
  imports: [FournisseurListComponent, CommonModule, FormsModule, FournisseurFormComponent, DeleteModalComponent],
  templateUrl: './fournisseur-page.component.html',
  styleUrl: './fournisseur-page.component.css'
})
export class FournisseurPageComponent implements OnInit, OnDestroy {
  protected selectedFournisseur: FournisseurModel | null | undefined = undefined;
  protected deleteSelectedFournisseur: FournisseurModel | undefined = undefined;

  protected fournisseurService = inject(FournisseurService);

  get fournisseurs(): FournisseurModel[] {
    return this.fournisseurService.fournisseursFiltered();
  }

  protected addFournisseur(data: FournisseurModel) {
    this.fournisseurService.addFournisseur(data).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Fournisseur enregistrée avec succès'
        });

        this.selectedFournisseur = undefined;
      }
    });
  }

  protected editFournisseur(data: FournisseurModel) {
    this.fournisseurService.editFournisseur(this.selectedFournisseur?.id as number, data).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Fournisseur modifiée avec succès'
        });

        this.selectedFournisseur = undefined;
      }
    });
  }

  protected deleteFournisseur() {
    this.fournisseurService.deleteFournisseur(this.deleteSelectedFournisseur?.id as number).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Fournisseur supprimée avec succès'
        });

        this.deleteSelectedFournisseur = undefined;
      }
    });
  }

  protected setSelectedFournisseur(data: FournisseurModel) {
    this.selectedFournisseur = data;
  }

  protected setDeleteSelectedFournisseur(data: FournisseurModel) {
    this.deleteSelectedFournisseur = data;
  }

  private loadFournisseur: Subscription | null = null;

  ngOnInit(): void {
    this.loadFournisseur = this.fournisseurService.loadFournisseur().subscribe();
  }

  ngOnDestroy(): void {
    this.loadFournisseur?.unsubscribe();
  }

}
