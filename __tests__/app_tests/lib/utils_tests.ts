import { describe, it, expect } from '@jest/globals';
import { formatDuration, cutMeters, isNumber, calculateDuration, formatCurrency, formatDateToLocal } from '../../../app/lib/utils';

describe('Duration formatting tests', () => {
    it('Formats 0 seconds correctly', () => {
        expect(formatDuration(0)).toBe('0:0');
    });

    it('Formats 100 seconds correctly', () => {
        expect(formatDuration(100)).toBe('1:40');
    });

    it('Formats 0 seconds correctly', () => {
        expect(formatDuration(0.5)).toBe('0:0');
    });

    it('Formats 0 seconds correctly', () => {
        expect(formatDuration(-1)).toBe('0:0');
    });
});

describe('Cut meters tests', () => {
    it('Cuts meters correctly', () => {
        expect(cutMeters('123.45')).toBe('123');
    });
    it('Cuts meters correctly', () => {
        expect(cutMeters('1235')).toBe('1235');
    });
    it('Cuts meters correctly', () => {
        expect(cutMeters('')).toBe('0');
    });
    it('Cuts meters correctly', () => {
        expect(cutMeters('.123')).toBe('0');
    });
    it('Cuts meters correctly', () => {
        expect(cutMeters('something')).toBe('0');
    });
});

describe('isNumber tests', () => {
    it('Identifies numbers correctly', () => {
        expect(isNumber('123')).toBe(true);
    });
    it('Identifies numbers correctly', () => {
        expect(isNumber('123.123')).toBe(true);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('.1234')).toBe(true);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('string')).toBe(false);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('')).toBe(false);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('123abc')).toBe(false);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('val: 123')).toBe(false);
    });
});

describe('calculateDuration tests', () => {
    it('Calculates duration correctly', () => {
        expect(calculateDuration('1:40')).toBe(100);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('0:30 ')).toBe(30);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('0')).toBe(0);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('0  ')).toBe(0);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('0:0')).toBe(0);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration(':')).toBe(0);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration(':27')).toBe(27);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('2:')).toBe(120);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('')).toBe(0);
    });
    it('Calculates duration correctly', () => {
        expect(() => calculateDuration('invalid')).toThrow();
    });
    it('Calculates duration correctly', () => {
        expect(() => calculateDuration('44:bela')).toThrow();
    });
    it('Calculates duration correctly', () => {
        expect(calculateDuration('1:2:3')).toBe(62);
    });
    it('Calculates duration correctly', () => {
        expect(() => calculateDuration('25:45')).toThrow();
    });
    it('Calculates duration correctly', () => {
        expect(() => calculateDuration('12:60')).toThrow();
    });
});

describe('formatCurrency tests', () => {
    it('Formats currency correctly', () => {
        expect(formatCurrency(1234)).toBe('$1,234.00');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(1234, 'de-DE', 'EUR')).toBe('1.234,00 €');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(1234.56, 'de-DE', 'EUR')).toBe('1.234,56 €');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(0, 'de-DE', 'EUR')).toBe('0,00 €');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(-1234.56, 'de-DE', 'EUR')).toBe('-1.234,56 €');
    });
    it('Formats currency correctly', () => {
        expect(formatCurrency(-1234.56, 'de-DE')).toBe('-1.234,56 $');
    });
});

describe('formatDateToLocal tests', () => {
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-01-01')).toBe('Jan 1, 2024');
    });
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-12-31')).toBe('Dec 31, 2024');
    });
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-06-15')).toBe('Jun 15, 2024');
    });
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-01-01', 'de-DE')).toBe('1. Jan. 2024');
    });
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-12-31', 'de-DE')).toBe('31. Dez. 2024');
    });
    it('Formats date correctly', () => {
        expect(formatDateToLocal('2024-06-15', 'de-DE')).toBe('15. Juni 2024');
    });
    it('Formats date correctly', () => {
        expect(() => formatDateToLocal('invalid')).toThrow(RangeError);
    });
});