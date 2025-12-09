import { MaskitoOptions } from '@maskito/core';
import { CurrencyConfig } from './currency-config';
import { createFormattingPostprocessor } from './currency-postprocessors';
import {
  createPrefixPreprocessor,
  createSelectionPreprocessor,
} from './currency-preprocessors';

/**
 * Cria as opções do Maskito para máscara de moeda
 */
export function createCurrencyMaskOptions(
  config: CurrencyConfig
): MaskitoOptions {
  return {
    // Máscara permissiva - aceita dígitos e os caracteres de formatação
    mask: /^.+$/,
    preprocessors: [
      createPrefixPreprocessor(config),
      createSelectionPreprocessor(config),
    ],
    postprocessors: [createFormattingPostprocessor(config)],
  };
}
