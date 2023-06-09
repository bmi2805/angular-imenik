import { Component, OnInit } from '@angular/core';
import { KontaktiService } from '../kontakti.service';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss']
})
export class ProfilKorisnikaComponent implements OnInit {

 constructor(private sharedData: SharedDataService){}


 ngOnInit(): void {
  const firstName = 'John'; // Postavite ime koje želite
  this.sharedData.setFirstName(firstName);
}


  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };
  passwords = {
    oldPassword: '',
    newPassword: ''
  };
  isEditMode = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }



  changePassword() {
    console.log('Izmjena lozinke', this.passwords);
   
  }

}