import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private readonly language = new BehaviorSubject<string>(
    window.navigator.language
  );

  language$ = this.language.asObservable();

  setLanguage(language: string) {
    this.language.next(language);
  }
}
