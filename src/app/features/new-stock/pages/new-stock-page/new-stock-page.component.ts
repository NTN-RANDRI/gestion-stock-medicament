import { Component, inject } from '@angular/core';
import { NsInformationFormComponent } from '../../components/ns-information-form/ns-information-form.component';
import { NsListMedicamentComponent } from '../../components/ns-list-medicament/ns-list-medicament';
import { NewStockService } from '../../services/new-stock.service';
import { NsCrudFormComponent } from '../../components/ns-crud-form/ns-crud-form.component';
import { CommonModule } from '@angular/common';
import { NsMedicamentModel } from '../../models/ns-medicament.model';
import { DeleteModalComponent } from '@/app/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-new-stock-page',
  imports: [CommonModule, NsInformationFormComponent, NsListMedicamentComponent, NsCrudFormComponent, DeleteModalComponent],
  templateUrl: './new-stock-page.component.html',
  styleUrl: './new-stock-page.component.css'
})
export class NewStockPageComponent {
  protected selectedEntreeStock: NsMedicamentModel | null | undefined = undefined;
  protected deleteSelectedEntreeStock: NsMedicamentModel | undefined = undefined;

  // injection
  protected nsService = inject(NewStockService);

  protected async save() {
    await this.nsService.saveNewStock();
    alert('save success');
    this.nsService.resetAll();
  }

  protected setSelectedEntreeStock(data: NsMedicamentModel) {
    this.selectedEntreeStock = data;
  }

  protected setDeleteSelected(data: NsMedicamentModel) {
    this.deleteSelectedEntreeStock = data;
  }

  protected addEntreeStock(data: NsMedicamentModel) {
    this.nsService.addEntreeStock(data);
    this.selectedEntreeStock = undefined;
  }

  protected editEntreeStock(data: NsMedicamentModel) {
    this.nsService.editEntreeStock(this.selectedEntreeStock as NsMedicamentModel, data);
    this.selectedEntreeStock = undefined;
  }

  protected deleteEntreeStock() {
    this.nsService.deleteEntreeStock(this.deleteSelectedEntreeStock as NsMedicamentModel);
    this.deleteSelectedEntreeStock = undefined;
  }


}
