import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'Imenik';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // this.authService.autoLogin();
  }

  @HostBinding('class')
  get themeMode() {
    return 'theme-light';
  }
}
