import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, Routes } from '@angular/router';
import { Subject, Subscription, lastValueFrom } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotifyDialogComponent } from '../../../../../components/notify-dialog/confirm-dialog.component';
import { SnackbarNotifyService } from '../../../../../services/snackbar-notify.service';
import { UnosKontaktaComponent } from '../unos-kontakta/unos-kontakta.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { IKorisnik } from '../../../models/korisnik.model';

@Component({
  selector: 'app-imenik',
  standalone: true,
  imports: [
    UnosKontaktaComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatPaginatorModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './imenik.component.html',
  styleUrls: ['./imenik.component.scss'],
})
export class ImenikComponent implements OnInit, AfterViewInit, OnDestroy {
  // Spremanje korisnika u niz
  loadedContacts: IKorisnik[] = [];
  error2 = new Subject<string>();

  isLoading = false;
  error: string | null = null;
  private errorSub!: Subscription;
  searchKey: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<IKorisnik> =
    new MatTableDataSource<IKorisnik>();
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

  authService = inject(AuthService);
  dialog = inject(MatDialog);
  router = inject(Router);
  snackbar_notify = inject(SnackbarNotifyService);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.errorSub = this.error2.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    console.log(this.loadedContacts.length);
    this.dohvatiKorisnikeAsync();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Postavljanje sortiranja
    this.dataSource.paginator = this.paginator; // Postavljanje paginacije
  }

  unosKontakta(): void {
    this.router.navigateByUrl('autentifikacija/unos');
  }

  async deleteContact(contactId: string) {
    try {
      const rezultatRequesta = await lastValueFrom(
        this.http.delete(
          `${environment.appUrl}/users/${this.authService.user.userId}/imenik/${contactId}.json`
        )
      );
      if (
        rezultatRequesta == null ||
        Object.keys(rezultatRequesta).length === 0
      ) {
        this.dohvatiKorisnikeAsync();
        this.snackbar_notify.notify(
          'Brisanje',
          'Vaš kontakt je uspješno obrisan',
          5000,
          'success'
        );
      }
    } catch (error) {
      this.snackbar_notify.notify(
        'Brisanje',
        'Vaš kontakt nije  obrisan',
        5000,
        'error'
      );
    }
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
  onHandleError(): void {
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

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  async dohvatiKorisnikeAsync(): Promise<void> {
    try {
      const rezultatRequesta = await lastValueFrom(
        this.http.get<{ [key: string]: IKorisnik }>(
          `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`
        )
      );
      if (rezultatRequesta != null) {
        this.dataSource.data = Object.keys(rezultatRequesta).map((key) => {
          return { ...rezultatRequesta[key], id: key };
        });
      }
    } catch (error) {
      this.snackbar_notify.notify(
        'Greška',
        'Došlo je do neočekivane greške',
        5000,
        'error'
      );
    }
  }
}
