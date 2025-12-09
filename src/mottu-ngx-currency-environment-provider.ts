import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { NGX_CURRENCY_CONFIG } from 'ngx-currency';
import { switchMap, tap } from 'rxjs';
import { UserPreferencesService } from './app/services/user-preferences.service';

export function provideCustomNgxCurrencyEnvironment(): EnvironmentProviders {
  const countryPrefix = {
    'pt-BR': 'R$',
    'en-US': '$',
    'es-ES': 'MXN$',
  } as const;

  const prefix =
    countryPrefix[navigator.language as keyof typeof countryPrefix] || 'R$';

  return makeEnvironmentProviders([
    {
      provide: NGX_CURRENCY_CONFIG,
      useFactory: () => {
        const userPreferencesService = inject(UserPreferencesService);

        return userPreferencesService.language$.pipe(
          tap((language) => console.log(`${language} foi selecionado`)),
          switchMap(
            (language) => countryPrefix[language as keyof typeof countryPrefix]
          )
        );
      },
      deps: [UserPreferencesService],
    },
  ]);
}
