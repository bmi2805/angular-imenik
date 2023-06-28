import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
    MatDividerModule,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  sidenav!: MatSidenav;
  firstName = '';
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.firstName = user.displayName;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  odjaviSe(): void {
    this.authService.odjaviSe();
  }
}
