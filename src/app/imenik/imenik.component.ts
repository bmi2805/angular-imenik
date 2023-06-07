import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Korisnik } from '../shared/post.model';
import { KontaktiService } from '../kontakti.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotifyService } from '../snackbar-notify/snackbar-notify.service';

@Component({
  selector: 'app-imenik',
  templateUrl: './imenik.component.html',
  styleUrls: ['./imenik.component.scss'],
})
export class ImenikComponent implements OnInit, AfterViewInit, OnDestroy {
  // Spremanje korisnika u niz
  loadedContacts: Korisnik[] = [];

  isLoading = false;
  error: string | null = null;
  private errorSub!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Korisnik> = new MatTableDataSource<Korisnik>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private kontaktiService: KontaktiService,
    private _snackBar: MatSnackBar,
    private snackbar_notify:SnackbarNotifyService
  ) {}

  ngOnInit(): void {
    this.errorSub = this.kontaktiService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    // Svakim otvaranjem komponente da se i povlače korisnici
    this.dohvatiKontakte();
    // Da se svaki put i osvježi
    this.onOsvjezi();
  }

  ngAfterViewInit(): void {}

  unosKontakta() {
    this.router.navigateByUrl('/unos');
  }

  onOsvjezi() {
    this.kontaktiService.dohvatiKorisnike().subscribe((kontakti) => {
      this.loadedContacts = kontakti;
      this.dataSource.data = this.loadedContacts;
    });
  }

  dohvatiKontakte() {
    this.kontaktiService.dohvatiKorisnike().subscribe(
      (kontakti) => {
        this.isLoading = false;
        this.loadedContacts = kontakti;
        this.dataSource.data = this.loadedContacts;

        this.dataSource.sort = this.sort; // Postavljanje sortiranja
        this.dataSource.paginator = this.paginator; // Postavljanje paginacije
      },
      (error) => {
        this.isLoading = false;
        this.error = error.message;
        console.log(error.name);
      }
    );
  }

  displayedColumns: string[] = [
    'name',
    'lastName',
    'address',
    'city',
    'postalCode',
    'phone',
    'date',
    'email',
    'actions',
  ];

  deleteContact(contactId: string) {
    this.kontaktiService.izbrisiKorisnika(contactId).subscribe(() => {
      console.log('Korisnik je uspješno obrisan.');
      this.onOsvjezi();

      // this.kontaktiService.openSnackBar(
      //   'Vaš kontakt je uspješno obrisan',
      //   'Uredu',
      //   'snackbar-success'
      // );

      this.snackbar_notify.notify("Brisanje","Vaš kontakt je uspješno obrisan",5000, 'success')

    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }

  openDialog(contactId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContact(contactId);
      }
    });
  }
}
