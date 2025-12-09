export interface CurrencyConfig {
  prefix: string;
  decimalSeparator: string;
  thousandsSeparator: string;
  currencyCode: string;
}

export const CURRENCY_CONFIG_MAP: Record<string, CurrencyConfig> = {
  'pt-BR': {
    prefix: 'R$ ',
    decimalSeparator: ',',
    thousandsSeparator: '.',
    currencyCode: 'BRL',
  },
  'en-US': {
    prefix: '$ ',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    currencyCode: 'USD',
  },
  'es-ES': {
    prefix: '€ ',
    decimalSeparator: ',',
    thousandsSeparator: '.',
    currencyCode: 'EUR',
  },
  'es-MX': {
    prefix: '$ ',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    currencyCode: 'MXN',
  },
};

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig =
  CURRENCY_CONFIG_MAP['en-US'];
