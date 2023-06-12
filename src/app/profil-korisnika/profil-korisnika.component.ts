import { Component, OnInit } from '@angular/core';
import { KontaktiService } from '../kontakti.service';
import { SharedDataService } from './shared-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss']
})
export class ProfilKorisnikaComponent implements OnInit {

 constructor(private sharedData: SharedDataService, private auth:AuthService,private snackBar: MatSnackBar){}


 ngOnInit(): void {
  this.sharedData.setFirstName(this.user.firstName);

}
loadedUser: User;


  user = {
    firstName: '[Uredite ime]',
    lastName: 'Doe',
    email: `${this.auth.user.email}`
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
    const email = this.auth.user.email; // Pretpostavljam da koristite prijavljenog korisnika
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
    }
}