import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigacija',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // standalone:true,
  // imports:[RouterModule,MatSidenavModule,CommonModule, MatIconModule,MatButtonModule,MatDividerModule,MatToolbarModule,]
})
export class NavigacijaComponent implements OnInit, OnDestroy {
  sidenav!: MatSidenav;
  firstName = '';
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
