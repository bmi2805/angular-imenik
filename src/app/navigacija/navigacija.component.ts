import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../profil-korisnika/shared-data.service';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss'],
})
export class NavigacijaComponent implements OnInit, OnDestroy{
  sidenav!: MatSidenav;

isAuthenticated = false;

private userSub:Subscription;

  constructor(private authService:AuthService, private sharedData: SharedDataService) {

  }
first_name = "ivan"
  ngOnInit(): void {
      this.userSub= this.authService.user$.subscribe( user =>{
        this.isAuthenticated = !user ? false : true;
        console.log(!user);
        console.log(!!user)
      });
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  odjaviSe(){
    this.authService.odjaviSe();
  }
}
