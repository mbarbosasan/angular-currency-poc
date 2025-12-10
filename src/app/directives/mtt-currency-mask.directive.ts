import {
  DestroyRef,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserPreferencesService } from '../services/user-preferences.service';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';


@Directive({
  standalone: true,
  selector: '[appMttCurrencyMask]',
  hostDirectives: [MaskitoDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MttCurrencyMaskDirective),
      multi: true,
    },
  ],
})
export class MttCurrencyMaskDirective implements OnInit, ControlValueAccessor
{
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private isDisabled = false;
  // ControlValueAccessor callbacks
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {

  }

  // ControlValueAccessor implementation
  writeValue(value: number | string | null): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.el.nativeElement.disabled = isDisabled;
  }
}
