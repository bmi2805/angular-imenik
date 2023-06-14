import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, of } from 'rxjs';
import { KontaktiService } from 'src/app/kontakti.service';
import { Korisnik } from 'src/app/shared/post.model';
import { SnackbarNotifyService } from 'src/app/snackbar-notify/snackbar-notify.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SafeData } from 'src/app/auth/save-data.interface';

@Component({
  selector: 'app-unos-kontakta',
  templateUrl: './unos-kontakta.component.html',
  styleUrls: ['./unos-kontakta.component.scss'],
})
export class UnosKontaktaComponent implements OnInit, SafeData {
  user: Korisnik = {
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
    private http: HttpClient,
    private router: Router,
    private kontaktiService: KontaktiService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private snackbar_notify: SnackbarNotifyService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
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
    this.signupForm.reset();
    this.kontaktiService.createAndStoreContact(postData);
    this.snackbar_notify.notify(
      'Spremi',
      'Vaš kontakt je uspješno spremljen',
      5000,
      'success'
    );

    this.vratiNaImenik();
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
      this.kontaktiService.openSnackBar(
        'Vaš kontakt nije spremljen.',
        'Zatvori',
        'snackbar-error'
      );
    }
  }

  vratiNaImenik(): void {
    this.router.navigateByUrl('autentifikacija/imenik');
  }

  // vratiNaImenik2() {
  //   if (this.signupForm.pristine) {
  //     this.router.navigateByUrl('autentifikacija/imenik');
  //   } else {
  //     this.canDeactivate().subscribe((canNavigate) => {
  //       if (canNavigate) {
  //         this.router.navigateByUrl('autentifikacija/imenik');
  //       }
  //     });
  //   }
  // }

  // canDeactivate(): Observable<boolean> {
  //   if (this.signupForm.dirty) {
  //     const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //       width: '400px',
  //       data: {
  //         message:
  //           'Jeste li sigurni da se želite vratiti natrag? Vaše promjene ce biti izgubljene?',
  //         title: 'Provjera',
  //       },
  //     });
  //     return dialogRef.afterClosed();
  //   }
  //   // Nema nesačuvanih promena, dozvolite navigaciju
  //   return of(true);
  // }
}
