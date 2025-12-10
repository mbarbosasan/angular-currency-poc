import {
  DestroyRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Maskito } from '@maskito/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { UserPreferencesService } from '../services/user-preferences.service';
import {
  createCurrencyMaskOptions,
  CURRENCY_CONFIG_MAP,
  CurrencyConfig,
  DEFAULT_CURRENCY_CONFIG,
  formatNumericValue,
  parseFormattedValue,
} from './currency-mask';

@Directive({
  standalone: true,
  selector: '[appMttCurrencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MttCurrencyMaskDirective),
      multi: true,
    },
  ],
})
export class MttCurrencyMaskDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly userPreferencesService = inject(UserPreferencesService);
  private readonly destroyRef = inject(DestroyRef)

  private readonly language$ = this.userPreferencesService.language$;

  private maskitoRef: Maskito | null = null;

  private currentConfig: CurrencyConfig = DEFAULT_CURRENCY_CONFIG;
  private isDisabled = false;

  // ControlValueAccessor callbacks
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  private get inputElement(): HTMLInputElement {
    return this.el.nativeElement;
  }

  @HostListener('input')
  onInput(): void {
    const numericValue = parseFormattedValue(
      this.inputElement.value,
      this.currentConfig
    );
    this.onChange(numericValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: number | string | null): void {
    let numericValue: number | null = null;

    if (value !== null && value !== undefined && value !== '') {
      numericValue = typeof value === 'string' ? parseFloat(value) : value;

      if (isNaN(numericValue)) {
        numericValue = null;
      }
    }

    const formattedValue = formatNumericValue(numericValue, this.currentConfig);
    this.inputElement.value = formattedValue;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.inputElement.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.language$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((language) => {
      this.maskitoRef?.destroy();

      this.currentConfig =
        CURRENCY_CONFIG_MAP[language] ?? DEFAULT_CURRENCY_CONFIG;

      const currentValue = parseFormattedValue(
        this.inputElement.value,
        this.currentConfig
      );
      const formattedValue = formatNumericValue(
        currentValue,
        this.currentConfig
      );
      this.inputElement.value = formattedValue;

      const maskOptions = createCurrencyMaskOptions(this.currentConfig);
      this.maskitoRef = new Maskito(this.inputElement, maskOptions);
    });
  }

  ngOnDestroy(): void {
    this.maskitoRef?.destroy();
  }
}
