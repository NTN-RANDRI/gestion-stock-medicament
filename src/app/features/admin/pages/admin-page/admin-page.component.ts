import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../../components/admin-header/admin-header.component";
import { AdminNavComponent } from "../../components/admin-nav/admin-nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [AdminHeaderComponent, AdminNavComponent, RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
