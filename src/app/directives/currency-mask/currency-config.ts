export interface CurrencyConfig {
  prefix: string;
  decimalSeparator: string;
  thousandsSeparator: string;
  currencyCode: string;
}

export const CURRENCY_CONFIG_MAP: Record<string, CurrencyConfig> = {
  'BR': {
    prefix: 'R$ ',
    decimalSeparator: ',',
    thousandsSeparator: '.',
    currencyCode: 'BRL',
  },
  'US': {
    prefix: '$ ',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    currencyCode: 'USD',
  },
  'MX': {
    prefix: 'MXN$ ',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    currencyCode: 'MXN',
  },
};

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig =
  CURRENCY_CONFIG_MAP['BR'];
