import { MaskitoPreprocessor } from '@maskito/core';
import { CurrencyConfig } from './currency-config';

/**
 * Preprocessor: Garante que o prefixo esteja sempre presente
 * e filtra caracteres não numéricos da entrada
 */
export function createPrefixPreprocessor(
  config: CurrencyConfig
): MaskitoPreprocessor {
  return ({ elementState, data }) => {
    const { prefix } = config;
    const { value, selection } = elementState;

    // Se o valor não começa com o prefixo, adiciona
    if (!value.startsWith(prefix)) {
      const newValue = prefix + value.replace(prefix, '');
      return {
        elementState: {
          value: newValue,
          selection: [
            Math.max(prefix.length, selection[0]),
            Math.max(prefix.length, selection[1]),
          ] as [number, number],
        },
        data,
      };
    }

    // Filtra apenas dígitos do que está sendo inserido
    const filteredData = data.replace(/[^\d]/g, '');

    return {
      elementState,
      data: filteredData,
    };
  };
}

/**
 * Preprocessor: Impede que o cursor vá antes do prefixo
 */
export function createSelectionPreprocessor(
  config: CurrencyConfig
): MaskitoPreprocessor {
  return ({ elementState, data }) => {
    const { prefix } = config;
    const { value, selection } = elementState;
    const [start, end] = selection;

    // Garante que a seleção não vá antes do prefixo
    const minPosition = prefix.length;
    const newStart = Math.max(start, minPosition);
    const newEnd = Math.max(end, minPosition);

    if (newStart !== start || newEnd !== end) {
      return {
        elementState: {
          value,
          selection: [newStart, newEnd] as [number, number],
        },
        data,
      };
    }

    return { elementState, data };
  };
}

