import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  imports: [RouterLink],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  protected currentUrl: string = '/admin';
  private routeSubscription: Subscription | null = null;


  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentUrl = event.url;
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
