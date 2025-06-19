import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DemandeModel } from '../../models/demande.model';
import { LignesDemandeModel } from '../../models/lignes-demande.model';
import { CommonModule } from '@angular/common';
import { DemandeDetailService } from '../../services/demande-detail.service';

@Component({
  selector: 'app-demande-detail-page',
  imports: [CommonModule],
  templateUrl: './demande-detail-page.component.html',
  styleUrl: './demande-detail-page.component.css'
})
export class DemandeDetailPageComponent implements OnInit, OnDestroy {
  private loadDemandeByIdSubscription: Subscription | null = null;

  private route = inject(ActivatedRoute);
  private demandeDetailService = inject(DemandeDetailService);

  get demande(): DemandeModel | null {
    return this.demandeDetailService.demande();
  }

  get valeur(): number {
    return this.demandeDetailService.valeur() as number;
  }

  ngOnInit(): void {
    const demandeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDemandeByIdSubscription = this.demandeDetailService.loadDemandeById(demandeId).subscribe();
  }

  ngOnDestroy(): void {
    this.loadDemandeByIdSubscription?.unsubscribe();
  }

}
