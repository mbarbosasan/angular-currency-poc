import { Injectable, inject } from '@angular/core';
import { MaskitoNumberParams, maskitoNumberOptionsGenerator } from '@maskito/kit';
import { map } from 'rxjs';
import { UserPreferencesService } from './user-preferences.service';

@Injectable({
  providedIn: 'root',
})
export class MaskitoService {
  private readonly userPreferencesService = inject(UserPreferencesService);

  countryOptions: Record<string, MaskitoNumberParams> = {
    BR: {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: ',',
      prefix: 'R$ ',
    },
    MX: {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: '.',
      prefix: 'MXN$ ',
    },
    US: {
      maximumFractionDigits: 2,
      thousandSeparator: '.',
      decimalSeparator: '.',
      prefix: '$ ',
    },
  };

  constructor() {}

  getMaskitoOptions() {
    return this.userPreferencesService.country$.pipe(
      map((country) =>
        maskitoNumberOptionsGenerator(this.countryOptions[country])
      )
    );
  }
}
