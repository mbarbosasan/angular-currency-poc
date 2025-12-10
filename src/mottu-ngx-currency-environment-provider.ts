import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { NGX_CURRENCY_CONFIG } from 'ngx-currency';
import { UserPreferencesService } from './app/services/user-preferences.service';


// Deveria ser uma tentativa de conseguir mudar a currency do ngxCurrency globalmente de forma dinâmica, mas não funciona porquê o provider
// vai capturar apenas o primeiro valor;
export function provideCustomNgxCurrencyEnvironment(): EnvironmentProviders {
  const countryPrefix = ['R$','$','MXN$']

  // Idealmente aqui deveriamos ter alguma forma de capturar o país do usuário, como o objetivo é apenas
  // validar o NgxCurrency, é feito um acesso randômico na Array;
  const max = 2;
  const min = 0;
  
  const randomIndex = Math.floor((Math.random() * (max - min + 1)) + min);
  const prefix = countryPrefix[randomIndex];

  return makeEnvironmentProviders([
    {
      provide: NGX_CURRENCY_CONFIG,
      useFactory: () => {
        // const userPreferencesService = inject(UserPreferencesService);
        // return userPreferencesService.country$.subscribe((country) => {
        // return { prefix: <COUNTRY>}
        // })
        return {
          prefix,
        }
      },
      deps: [UserPreferencesService],
    },
  ]);
}
