import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SelectWithSearchComponent } from "../../../../components/select-with-search/select-with-search.component";
import { MedicamentListComponent } from "../../components/medicament-list/medicament-list.component";
import { MedicamentService } from '../../services/medicament.service';
import { MedicamentModel } from '../../models/medicament.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MedicamentFormComponent } from "../../components/medicament-form/medicament-form.component";
import { DeleteModalComponent } from "../../../../components/delete-modal/delete-modal.component";
import { FormsModule } from '@angular/forms';
import { Toast } from '@/app/librairie/sweetalert2/toast';

@Component({
  selector: 'app-medicament-page',
  imports: [CommonModule, FormsModule, SelectWithSearchComponent, MedicamentListComponent, MedicamentFormComponent, DeleteModalComponent],
  templateUrl: './medicament-page.component.html',
  styleUrl: './medicament-page.component.css'
})
export class MedicamentPageComponent implements OnInit, OnDestroy {
  protected selectedMedicament: MedicamentModel | null | undefined = undefined;
  protected deleteSelectedMedicament: MedicamentModel | undefined = undefined;

  protected formes: string[] = ['Comprimé', 'Liquide', 'Gélule', 'Crème', 'Injectable'];

  protected medicamentService = inject(MedicamentService);

  get medicaments(): MedicamentModel[] {
    return this.medicamentService.medicamentsFiltered();
  }

  protected addMedicament(data: MedicamentModel) {
    this.medicamentService.addMedicament(data).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Médicament enregistrée avec succès'
        });

        this.selectedMedicament = undefined;
      }
    });

  }

  protected editMedicament(data: MedicamentModel) {
    this.medicamentService.editMedicament(this.selectedMedicament?.id as number, data).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Médicament modifiée avec succès'
        });

        this.selectedMedicament = undefined;
      }
    });
  }

  protected deleteMedicament() {
    this.medicamentService.deleteMedicament(this.deleteSelectedMedicament?.id as number).subscribe({
      next: _ => {
        Toast.fire({
          icon: 'success',
          title: 'Médicament supprimée avec succès'
        });

        this.deleteSelectedMedicament = undefined;
      }
    });
  }

  setSelectedMedicament(data: MedicamentModel) {
    this.selectedMedicament = data;
  }

  setDeleteSelectedMedicament(data: MedicamentModel) {
    this.deleteSelectedMedicament = data;
  }

  // subsctiption
  private loadMedicamentSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadMedicamentSubscription = this.medicamentService.loadMedicament().subscribe();
  }

  ngOnDestroy(): void {
    this.loadMedicamentSubscription?.unsubscribe();
  }

}
