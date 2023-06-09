import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private firstNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  firstName$: Observable<string> = this.firstNameSubject.asObservable();

  setFirstName(firstName: string) {
    this.firstNameSubject.next(firstName);
  }

  getName() {
    return this.firstName$;
  }
}