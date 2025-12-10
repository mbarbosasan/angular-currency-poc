import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { NgxCurrencyDirective } from 'ngx-currency';
import { filter, tap } from 'rxjs/operators';
import { MaskitoService } from './services/maskito.service';
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
    MaskitoDirective,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);
  private readonly userPreferencesService = inject(UserPreferencesService);
  private readonly maskitoService = inject(MaskitoService);

  currency = new FormControl<string>('123');
  language = new FormControl<string>('BR');

  countryOptions = ['BR', 'US', 'MX'];

  maskitoOptions$ = this.maskitoService.getMaskitoOptions();

  transactions$ = this.transactionsService
    .getTransactions()
    .pipe(tap(console.log));

  ngOnInit(): void {
    this.language.valueChanges
      .pipe(filter((val): val is string => !!val))
      .subscribe((country) => {
        this.userPreferencesService.setcountry(country);
      });
  }
}
