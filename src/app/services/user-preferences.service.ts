import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {

  private readonly country = new BehaviorSubject<string>(
    'BR'
  );

  country$ = this.country.asObservable();

  setcountry(country: string) {
    this.country.next(country);
  }
}
