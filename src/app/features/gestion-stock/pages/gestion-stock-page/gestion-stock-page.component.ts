import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { TokenService } from '@/app/core/services/token.service';
import { ProfileComponent } from "@/app/components/profile/profile.component";

@Component({
  selector: 'app-gestion-stock-page',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, ProfileComponent],
  templateUrl: './gestion-stock-page.component.html',
  styleUrl: './gestion-stock-page.component.css'
})
export class GestionStockPageComponent {

}
