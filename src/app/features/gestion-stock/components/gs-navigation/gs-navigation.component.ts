import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gs-navigation',
  imports: [CommonModule],
  templateUrl: './gs-navigation.component.html',
  styleUrl: './gs-navigation.component.css'
})
export class GsNavigationComponent {
  @Input() currentPage!: string;

  @Output() changePageEvent = new EventEmitter<string>();

  protected changePage(page: string) {
    if (!this.isPage(page)) {
      this.changePageEvent.emit(page);
    }
  }

  protected isPage(page: string) {
    return page === this.currentPage;
  }

}
