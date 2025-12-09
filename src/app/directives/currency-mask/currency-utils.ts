import { CurrencyConfig } from './currency-config';

/**
 * Converte um valor formatado (ex: "R$ 1.500,00") para número (1500.00)
 */
export function parseFormattedValue(
  value: string,
  config: CurrencyConfig
): number | null {
  if (!value) return null;

  // Extrai apenas os dígitos
  const digits = value.replace(/[^\d]/g, '');

  if (!digits) return null;

  // Converte para número (últimos 2 dígitos são centavos)
  const paddedDigits = digits.padStart(3, '0');
  const integerPart = paddedDigits.slice(0, -2) || '0';
  const decimalPart = paddedDigits.slice(-2);

  return parseFloat(`${integerPart}.${decimalPart}`);
}

/**
 * Converte um número (1500.00) para valor formatado (ex: "R$ 1.500,00")
 */
export function formatNumericValue(
  value: number | null | undefined,
  config: CurrencyConfig
): string {
  const { prefix, decimalSeparator, thousandsSeparator } = config;

  if (value === null || value === undefined) {
    return `${prefix}0${decimalSeparator}00`;
  }

  const [integerPart, decimalPart = '00'] = value.toFixed(2).split('.');

  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );

  return `${prefix}${formattedInteger}${decimalSeparator}${decimalPart}`;
}

