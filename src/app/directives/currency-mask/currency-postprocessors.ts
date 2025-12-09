import { MaskitoPostprocessor } from '@maskito/core';
import { CurrencyConfig } from './currency-config';

/**
 * Postprocessor: Formata o valor com separadores de milhares e decimal
 */
export function createFormattingPostprocessor(
  config: CurrencyConfig
): MaskitoPostprocessor {
  return ({ value, selection }) => {
    const { prefix, decimalSeparator, thousandsSeparator } = config;

    // Extrai apenas os dígitos
    const digits = value.replace(/[^\d]/g, '');

    if (!digits) {
      const defaultValue = `${prefix}0${decimalSeparator}00`;
      return {
        value: defaultValue,
        selection: [defaultValue.length, defaultValue.length] as [
          number,
          number
        ],
      };
    }

    // Garante pelo menos 3 dígitos para formatação (centavos)
    const paddedDigits = digits.padStart(3, '0');

    // Separa a parte inteira da decimal (últimos 2 dígitos são centavos)
    const integerPart = paddedDigits.slice(0, -2).replace(/^0+/, '') || '0';
    const decimalPart = paddedDigits.slice(-2);

    // Formata a parte inteira com separador de milhares
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandsSeparator
    );

    const formattedValue = `${prefix}${formattedInteger}${decimalSeparator}${decimalPart}`;

    // Mantém o cursor no final
    return {
      value: formattedValue,
      selection: [formattedValue.length, formattedValue.length] as [
        number,
        number
      ],
    };
  };
}

