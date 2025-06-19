import { Component, inject, Input } from '@angular/core';
import { GsDemandeModel } from '../../models/gs-demande.model';
import { CommonModule } from '@angular/common';
import { FormatService } from '@/app/core/services/format.service';

@Component({
  selector: 'app-gs-demande',
  imports: [CommonModule],
  templateUrl: './gs-demande.component.html',
  styleUrl: './gs-demande.component.css'
})
export class GsDemandeComponent {
  @Input() demandes!: GsDemandeModel[];

  protected formatService = inject(FormatService);

}
