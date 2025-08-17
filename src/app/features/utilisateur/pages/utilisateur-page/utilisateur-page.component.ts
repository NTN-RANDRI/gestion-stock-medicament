import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { UtilisateurModel } from '../../models/utilisateur.model';
import { UListComponent } from '../../components/u-list/u-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from "@/app/components/confirm-modal/confirm-modal.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur-page',
  imports: [FormsModule, CommonModule, ConfirmModalComponent],
  templateUrl: './utilisateur-page.component.html',
  styleUrl: './utilisateur-page.component.css'
})
export class UtilisateurPageComponent implements OnInit, OnDestroy {
  private loadUtilisateurSub: Subscription | null = null;

  protected idUtilisateurSelected: number | undefined = undefined;

  protected userService = inject(UtilisateurService);

  get users(): UtilisateurModel[] {
    return this.userService.utilisateursFiltered();
  }

  protected accepter(id: number) {
    this.userService.accepter(id).subscribe({
      next: _ => {
        this.idUtilisateurSelected = undefined;

        Swal.fire({
          title: "Compte utilisateur créé avec succès !",
          text: "L’utilisateur a été approuvé et peut maintenant se connecter.",
          icon: "success",
          draggable: true
        });
      }
    })
  }

  protected refuser(id: number) {
    this.userService.refuser(id).subscribe({
      next: _ => {
        alert('refuser');
      }
    })
  }

  ngOnInit(): void {
    this.loadUtilisateurSub = this.userService.loadUtilisateur().subscribe();
  }

  ngOnDestroy(): void {
    this.loadUtilisateurSub?.unsubscribe();
  }

}
