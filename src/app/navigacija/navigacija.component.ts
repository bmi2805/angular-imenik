import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss'],
})
export class NavigacijaComponent implements OnInit, OnDestroy {
  sidenav!: MatSidenav;
  firstName = "";
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {

    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.firstName = user.displayName;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  odjaviSe() {
    this.authService.odjaviSe();
  }
}
