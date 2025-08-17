import { TokenService } from '@/app/core/services/token.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ConfirmModalComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  protected tokenService = inject(TokenService);
  protected showConfirmModal = false;

  private router = inject(Router);

  protected logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
