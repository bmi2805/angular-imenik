import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private firstNameSubject = new BehaviorSubject<string>('');

  firstName$ = this.firstNameSubject.asObservable();

  setFirstName(firstName: string) {
    this.firstNameSubject.next(firstName);
  }
}