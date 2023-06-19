import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, Routes } from '@angular/router';
import { IKorisnik } from '../../models/post.model';
import { KontaktiService } from '../../services/kontakti.service';
import { Subscription } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotifyService } from '../snackbar-notify/snackbar-notify.service';
import { UnosKontaktaComponent } from './unos-kontakta/unos-kontakta.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-imenik',
  standalone:true,
  imports:[UnosKontaktaComponent, MatIconModule,MatFormFieldModule,MatInputModule,RouterModule,MatPaginatorModule,MatDatepickerModule,FormsModule,MatTableModule,MatSortModule,CommonModule,MatButtonModule],
  templateUrl: './imenik.component.html',
  styleUrls: ['./imenik.component.scss'],
})
export class ImenikComponent implements OnInit, AfterViewInit, OnDestroy {
  // Spremanje korisnika u niz
  loadedContacts: IKorisnik[] = [];

  isLoading = false;
  error: string | null = null;
  private errorSub!: Subscription;
  searchKey: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<IKorisnik> = new MatTableDataSource<IKorisnik>();
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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private kontaktiService: KontaktiService,
    private _snackBar: MatSnackBar,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  ngOnInit(): void {
    this.errorSub = this.kontaktiService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    // Svakim otvaranjem komponente da se i povlače korisnici
    // this.dohvatiKontakte();
    // Da se svaki put i osvježi
    this.onOsvjezi();
  }

  ngAfterViewInit(): void {}

  unosKontakta() {
    this.router.navigateByUrl('autentifikacija/unos');
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
      }
    );
  }

 

  deleteContact(contactId: string) {
    this.kontaktiService.izbrisiKorisnika(contactId).subscribe(() => {
      this.onOsvjezi();
      this.snackbar_notify.notify(
        'Brisanje',
        'Vaš kontakt je uspješno obrisan',
        5000,
        'success'
      );
    });
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
  onHandleError() {
    this.error = null;
  }
  openDialog(contactId: string): void {
    const dialogRef = this.dialog.open(NotifyDialogComponent, {
      width: '450px',
      data: {
        message: 'Vaš kontakt će biti izbrisan?',
        title: 'Jeste li sigurni?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContact(contactId);
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
