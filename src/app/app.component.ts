import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { filter, tap } from 'rxjs/operators';
import { MttCurrencyMaskDirective } from './directives/mtt-currency-mask.directive';
import { TransactionsService } from './services/transactions.service';
import { UserPreferencesService } from './services/user-preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    AsyncPipe,
    NgxCurrencyDirective,
    ReactiveFormsModule,
    MttCurrencyMaskDirective,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);
  private readonly userPreferencesService = inject(UserPreferencesService);

  currency = new FormControl<string>('');
  language = new FormControl<string>('BR');

  countryOptions = ['BR', 'US', 'MX'];

  transactions$ = this.transactionsService
    .getTransactions()
    .pipe(tap(console.log));

  ngOnInit(): void {
    this.language.valueChanges.pipe(
      filter((val): val is string => !!val),
    ).subscribe((country) => {
      this.userPreferencesService.setcountry(country);
    });
  }
}
