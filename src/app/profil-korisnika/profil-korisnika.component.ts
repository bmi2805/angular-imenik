import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss']
})
export class ProfilKorisnikaComponent {

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
    // Ovdje implementirajte logiku za izmjenu lozinke
    console.log('Izmjena lozinke', this.passwords);
    // Primjer: Poziv API-ja za izmjenu lozinke
    // this.userService.changePassword(this.passwords).subscribe(response => {
    //   console.log('Lozinka uspješno izmijenjena');
    // }, error => {
    //   console.error('Greška prilikom izmjene lozinke', error);
    // });
  }
}