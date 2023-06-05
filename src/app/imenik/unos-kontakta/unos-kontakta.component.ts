import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { KontaktiService } from 'src/app/kontakti.service';
import { Korisnik } from 'src/app/shared/post.model';

@Component({
  selector: 'app-unos-kontakta',
  templateUrl: './unos-kontakta.component.html',
  styleUrls: ['./unos-kontakta.component.scss'],
})
export class UnosKontaktaComponent implements OnInit {
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

  signupForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private kontaktiService: KontaktiService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      postalCode: new FormControl(this.user.postalCode, Validators.required),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern('[0-9+]+'),Validators.minLength(9)]),
      date: new FormControl(this.user.date, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
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

              Object.keys(this.signupForm.controls).forEach(key => {
                this.signupForm.get(key).setValue(this.user[key])
              })
            });

        }
        if (this.router.url.includes('pregled')) {
          this.isViewMode = true;
          this.signupForm.disable();
        }
      }
    });
    // this.router.events
    //     .pipe(filter((event) => event instanceof NavigationEnd))
    //     .subscribe((event: NavigationEnd) => {
    //       const provjeraUrl = event.url;
    //       console.log('Ruta ovdje je: ' + provjeraUrl);

    //       if (provjeraUrl.includes('pregled')) {
    //         this.isViewMode = true;
    //       setTimeout(() => {
    //         this.signupForm.disable()

    //       }, 1000);
    //         console.log(this.signupForm);
    //       } else {
    //         this.isViewMode = false;
    //         console.log(this.isViewMode);
    //       }
    //     });

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

    console.log(this.signupForm);
    this.signupForm.reset();

    this.kontaktiService.createAndStoreContact(postData);
    this.openSnackBar('Vaš kontakt je uspješno spremljen', 'Uredu');
    this.vratiNaImenik();
  }

  onOsvjeziKontakt() {
    console.log(this.signupForm.getRawValue())
    
    const postData = {...this.signupForm.getRawValue(), id: this.user.id
    };

    if (this.userIdToUpdate) {
      this.kontaktiService
        .updateContact(this.userIdToUpdate, postData)
        .subscribe(() => {
          this.openSnackBar('Vaš kontakt je uspješno ažuriran', 'Uredu');
          this.vratiNaImenik();
        });
    } else {
      alert('Kontakt nije spremljen');
    }
  }

  vratiNaImenik() {
    this.router.navigateByUrl('imenik');
  }

  durationInSeconds = 5;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
