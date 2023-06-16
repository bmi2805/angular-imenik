import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone: true,
  //  imports:[RouterModule ,HttpClientModule],
   
})
export class AppComponent implements OnInit {
  title = 'Imenik';
constructor	(private authService:AuthService)
{}
  ngOnInit(): void {
      this.authService.autoLogin()
  }
}
