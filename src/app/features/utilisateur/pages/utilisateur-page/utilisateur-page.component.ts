import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { UtilisateurModel } from '../../models/utilisateur.model';
import { UListComponent } from '../../components/u-list/u-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateur-page',
  imports: [UListComponent, FormsModule],
  templateUrl: './utilisateur-page.component.html',
  styleUrl: './utilisateur-page.component.css'
})
export class UtilisateurPageComponent implements OnInit, OnDestroy {
  private loadUtilisateurSub: Subscription | null = null;

  protected userService = inject(UtilisateurService);

  get users(): UtilisateurModel[] {
    return this.userService.utilisateursFiltered();
  }

  ngOnInit(): void {
    this.loadUtilisateurSub = this.userService.loadUtilisateur().subscribe();
  }

  ngOnDestroy(): void {
    this.loadUtilisateurSub?.unsubscribe();
  }

}
