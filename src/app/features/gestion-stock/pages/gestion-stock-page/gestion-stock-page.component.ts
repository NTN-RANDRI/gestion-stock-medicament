import { Component } from '@angular/core';
import { GsHeaderComponent } from '../../components/gs-header/gs-header.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gestion-stock-page',
  imports: [CommonModule, GsHeaderComponent, RouterOutlet],
  templateUrl: './gestion-stock-page.component.html',
  styleUrl: './gestion-stock-page.component.css'
})
export class GestionStockPageComponent {

}
