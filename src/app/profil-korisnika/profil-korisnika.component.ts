import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../shared/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss']
})
export class ProfilKorisnikaComponent implements OnInit {

 

  loadedContacts: Korisnik[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadedContacts = this.route.snapshot.data['loadedContacts'];

    console.log(this.route.snapshot.data);
    
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