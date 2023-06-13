import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss']
})
export class ProfilKorisnikaComponent implements OnInit {

 constructor( private auth:AuthService,private snackBar: MatSnackBar, private sharedData:SharedDataService){}

 token = JSON.parse(localStorage.getItem('userData'))._token;

 ngOnInit(): void {

  console.log(this.token)
  
}
loadedUser: User;

  user = {
    firstName: ``,
    lastName: "",
    email: `${this.auth.user.email}`
  };
  passwords = {
    oldPassword: '',
    newPassword: ''
  };
  isEditMode = false;

  toggleEditMode() {
    if (this.isEditMode) {
      this.spremi();
    } else {
      this.isEditMode = true;
    }
  }
  
spremi() {
  const uData = {
    token: this.token,
    name: `${this.user.firstName} ${this.user.lastName}`, // Include the name property
    ...this.user
  };

  this.auth.updateProfile(uData).subscribe(
    res => {
      console.log(res);
      this.auth.getUserData(uData.token)

    },
    err => {
      console.log(err);
    }
  );

  this.isEditMode = false;
}



  changePassword() {
    const data = { idToken: this.auth.user.token, ...this.passwords };
    this.auth.changePassword(data).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  generateResetPasswordToken() {
    const email = this.auth.user.email; 
    this.auth.generatePasswordResetToken(email).subscribe(
      (email) => {
        this.snackBar.open(`Poslali smo upute za resetiranje lozinke na ${email}.`, 'Zatvori', {
          duration: 5000,
          panelClass: 'success-snackbar',
        });
      },
      (error) => {
        this.snackBar.open('Došlo je do pogreške prilikom generiranja tokena za resetiranje lozinke.', 'Zatvori', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    );

    console.log(this.auth.user)
    }
}