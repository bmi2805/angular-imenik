import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { KontaktiService } from 'src/app/services/kontakti.service';
import { IKorisnik } from 'src/app/models/post.model';
import { SnackbarNotifyService } from 'src/app/components/snackbar-notify/snackbar-notify.service';
import { SafeData } from 'src/app/models/save-data.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unos-kontakta',
 
  templateUrl: './unos-kontakta.component.html',
  styleUrls: ['./unos-kontakta.component.scss'],
  standalone:true,
  imports: [MatIconModule,MatFormFieldModule,MatInputModule, MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,CommonModule,MatButtonModule
  ]
})
export class UnosKontaktaComponent implements OnInit, SafeData {
  user: IKorisnik = {
    id: null,
    name: null,
    lastName: null,
    address: null,
    city: null,
    postalCode: null,
    phone: null,
    date: null,
    email: null,
  };
  public userIdToUpdate: string;
  registrationForm!: FormGroup;

  isEditMode: boolean = false;
  isViewMode: boolean = false;

  signupForm: any;
  maxDate = new Date();

  constructor(
    private router: Router,
    private kontaktiService: KontaktiService,
    private route: ActivatedRoute,
    private snackbar_notify: SnackbarNotifyService,
  ) {
    this.signupForm = new FormControl();
  }


  isDataSaved(): boolean {
return this.signupForm.dirty  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      postalCode: new FormControl(this.user.postalCode, Validators.required),
      phone: new FormControl(this.user.phone, [
        Validators.required,
        Validators.pattern('[0-9+]+'),
        Validators.minLength(9),
      ]),
      date: new FormControl(this.user.date, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });

    this.route.params.subscribe((params) => {
      if (params['id'] !== null) {
        const korisnikId = params['id'];
        this.userIdToUpdate = korisnikId;

        if (korisnikId != null) {
          this.isEditMode = false;
        } else {
          this.isEditMode = true;
        }

        if (korisnikId) {
          this.kontaktiService
            .dohvatiKorisnika(korisnikId)
            .subscribe((korisnik) => {
              this.user = korisnik;

              Object.keys(this.signupForm.controls).forEach((key) => {
                this.signupForm.get(key).setValue(this.user[key]);
              });
            });
        }
        if (this.router.url.includes('pregled')) {
          this.isViewMode = true;
          this.signupForm.disable();
        }
      }
    });
  }

onNoviKontakt() {
  const postData = {
    name: this.signupForm.get('name').value,
    lastName: this.signupForm.get('lastName').value,
    address: this.signupForm.get('address').value,
    city: this.signupForm.get('city').value,
    postalCode: this.signupForm.get('postalCode').value,
    phone: this.signupForm.get('phone').value,
    date: this.signupForm.get('date').value,
    email: this.signupForm.get('email').value,
    id: this.user.id,
  };

  // this.signupForm.reset();

  this.kontaktiService.createAndStoreContact(postData)
    .then(() => {
      this.snackbar_notify.notify(
        'Spremi',
        'Vaš kontakt je uspješno spremljen',
        5000,
        'success'
      );
      this.vratiNaImenik();
      this.signupForm.reset()
    })
    .catch(() => {
      this.snackbar_notify.notify(
        'Greška',
        'Došlo je do pogreške prilikom spremanja kontakta',
        5000,
        'error'
      );
    });
}

  onOsvjeziKontakt() {
    const postData = { ...this.signupForm.getRawValue(), id: this.user.id };

    if (this.userIdToUpdate) {
      this.kontaktiService
        .updateContact(this.userIdToUpdate, postData)
        .subscribe(() => {
          this.snackbar_notify.notify(
            'Spremi',
            'Vaš kontakt je uspješno spremljen',
            5000,
            'success'
          );
          this.vratiNaImenik();
        });
    } else {
      this.snackbar_notify.notify(
        'Spremi',
        'Vaš kontakt nije spremljen',
        5000,
        'error'
      );
    }
  }

  vratiNaImenik(): void {
    this.router.navigateByUrl('autentifikacija/imenik');
  }

}