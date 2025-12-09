// Configurações
export {
  CurrencyConfig,
  CURRENCY_CONFIG_MAP,
  DEFAULT_CURRENCY_CONFIG,
} from './currency-config';

// Preprocessors
export {
  createPrefixPreprocessor,
  createSelectionPreprocessor,
} from './currency-preprocessors';

// Postprocessors
export { createFormattingPostprocessor } from './currency-postprocessors';

// Utilitários
export { formatNumericValue, parseFormattedValue } from './currency-utils';

// Opções do Maskito
export { createCurrencyMaskOptions } from './currency-mask-options';

