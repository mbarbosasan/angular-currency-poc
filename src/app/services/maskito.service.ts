import { Injectable, inject } from '@angular/core';
import { MaskitoNumberParams, maskitoNumberOptionsGenerator } from '@maskito/kit';
import { UserPreferencesService } from './user-preferences.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaskitoService {

  private readonly userPreferencesService = inject(UserPreferencesService);

  countryOptions: Record<string, MaskitoNumberParams> = {
    'BR': {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: ',',
      prefix: 'MXN$ ',
    },
    'MX': {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: '.',
      prefix: 'MXN$ '
    },
    'US': {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: '.',
      prefix: '$ '
    }
  }

  constructor() { }

  getMaskitoOptions() {
    return this.userPreferencesService.country$.pipe(
      map((country) => maskitoNumberOptionsGenerator(this.countryOptions[country]))
    )
  }
}
