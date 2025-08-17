import { SelectWithSearchComponent } from '@/app/components/select-with-search/select-with-search.component';
import { ApiFournisseurService } from '@/app/core/api/api-fournisseur.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-ns-information-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SelectWithSearchComponent],
  templateUrl: './ns-information-form.component.html',
  styleUrl: './ns-information-form.component.css'
})
export class NsInformationFormComponent implements OnInit, OnDestroy {
  @Input() fournisseur!: FormControl;
  @Input() motif!: FormControl;

  // subscription
  private loadFournisseurSubscription: Subscription | null = null;

  private apiFournisseurService = inject(ApiFournisseurService);

  protected fournisseurs: string[] = [];

  ngOnInit(): void {
    // load fournisseurs
    this.loadFournisseurSubscription = this.apiFournisseurService.getAll().pipe(
      map(data => {
        this.fournisseurs = data.map(item => item.nom);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.loadFournisseurSubscription?.unsubscribe();
  }

}
