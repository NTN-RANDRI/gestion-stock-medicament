import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { SaleMedicamentModel } from '@/app/features/sale/models/sale-medicament.model';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  protected last7Days: { label: string; total: number }[] = [];

  // getter
  get totalStock(): number {
    return this.dashboardService.totalStock();
  }
  get totalPerimes(): number {
    return this.dashboardService.totalPerimes();
  }
  get totalDemandeMois(): number {
    return this.dashboardService.totalDemandeMois();
  }
  get stockBientotPerimes(): SaleMedicamentModel[] {
    return this.dashboardService.stockBientotPerimes();
  }

  // func protected
  protected generateLast7Days() {
    const today = new Date();

    this.last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      this.last7Days.push({
        label: format(d, 'EEE dd'),
        total: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      });
    }
  }

  // injection
  private dashboardService = inject(DashboardService);

  // subsctiption
  private loadStockSub: Subscription | null = null;
  private loadDemandeSub: Subscription | null = null;

  ngOnInit(): void {
    this.loadStockSub = this.dashboardService.loadStock().subscribe();
    this.loadDemandeSub = this.dashboardService.loadDemande().subscribe();
    this.generateLast7Days();
  }

  ngOnDestroy(): void {
    this.loadStockSub?.unsubscribe();
    this.loadDemandeSub?.unsubscribe();
  }
}
