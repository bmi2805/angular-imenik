import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

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
    MatSlideToggleModule,
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  router = inject(Router);
  sidenav!: MatSidenav;
  firstName = '';
  isAuthenticated = false;
  isDark = false;

  private userSub: Subscription;

  authService = inject(AuthService);

  userSig = signal('test');

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.firstName = user.displayName;
      }
    });

    console.log(this.userSig());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  odjaviSe(): void {
    this.authService.odjaviSe();
    this.router.navigate(['/prijava']);
  }

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  switchMode(isDarkMode: boolean) {
    this.isDark = isDarkMode;
  }

  onDarkModeSwitched(event: MatSlideToggleChange) {
    this.isDark = event.checked;
  }
}
