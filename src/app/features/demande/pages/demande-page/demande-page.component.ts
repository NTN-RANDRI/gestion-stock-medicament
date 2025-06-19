import { FormatService } from '@/app/core/services/format.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DemandeModel } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DemandeSearchComponent } from '../../components/demande-search/demande-search.component';

@Component({
  selector: 'app-demande-page',
  imports: [CommonModule, RouterLink, DemandeSearchComponent],
  templateUrl: './demande-page.component.html',
  styleUrl: './demande-page.component.css'
})
export class DemandePageComponent implements OnInit, OnDestroy {
  // subscribtion
  private loadDemandeSubscription: Subscription | null = null;

  protected demandes: DemandeModel[] = [];

  protected formatService = inject(FormatService);
  protected demandeService = inject(DemandeService);

  ngOnInit(): void {
    this.loadDemandeSubscription = this.demandeService.loadDemande().subscribe();
  }

  ngOnDestroy(): void {
    this.loadDemandeSubscription?.unsubscribe();
  }

}
