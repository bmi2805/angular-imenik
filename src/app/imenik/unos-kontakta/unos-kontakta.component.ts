import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('postForm') postForm!: NgForm;
  constructor(
    private http: HttpClient,
    private router: Router,
    private kontaktiService: KontaktiService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // console.log(this.isViewMode)
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
            });
        }
      }

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const provjeraUrl = event.url;
          console.log('Ruta ovdje je: ' + provjeraUrl);

          if (provjeraUrl.includes('pregled')) {
            // console.log("Ruta ovdje je: " + provjeraUrl)
            this.isViewMode = true;
            console.log(this.isViewMode);
          } else {
            this.isViewMode = false;
          }
        });
    });
  }

  onNoviKontakt(postData: Korisnik) {
    this.postForm.resetForm();

    this.kontaktiService.createAndStoreContact({
      id: postData.id,
      name: postData.name,
      lastName: postData.lastName,
      address: postData.address,
      city: postData.city,
      postalCode: postData.postalCode,
      phone: postData.phone,
      date: postData.date,
      email: postData.email,
    });
    this.openSnackBar('Vaš kontakt je uspješno spremljen', 'Uredu');
    this.vratiNaImenik();
  }

  onOsvjeziKontakt(postData: Korisnik) {
    if (this.userIdToUpdate) {
      this.kontaktiService
        .updateContact(this.userIdToUpdate, postData)
        .subscribe(() => {
          // alert('Kontakt uspješno ažuriran.');
          this.openSnackBar('Vaš kontakt je uspješno ažuriran', 'Uredu');

          this.postForm.reset();
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
  // openSnackBar(message: string, action: string) {

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
