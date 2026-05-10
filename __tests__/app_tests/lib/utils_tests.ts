import { describe, it, expect } from '@jest/globals';
import {
    formatDuration,
    cutMeters,
    isNumber,
    calculateDurationFromTimeStamp,
    formatCurrency,
    formatDateToLocal,
    calculateElapsedTime,
    roundElapsedTimeToHour,
    calculateDailyEarning,
}
    from '../../../app/lib/utils';

describe('Duration formatting tests', () => {
    it('Formats 0 minutes correctly', () => {
        expect(formatDuration(0)).toBe('00:00');
    });

    it('Formats 100 minutes correctly', () => {
        expect(formatDuration(100)).toBe('01:40');
    });
    it('Formats 63 minutes correctly', () => {
        expect(formatDuration(63)).toBe('01:03');
    });

    it('Formats decimal minutes correctly', () => {
        expect(formatDuration(0.5)).toBe('00:00');
    });

    it('Formats negative minutes correctly', () => {
        expect(formatDuration(-1)).toBe('00:00');
    });
});

describe('Cut meters tests', () => {
    it('Cuts meters correctly', () => {
        expect(cutMeters('123.45')).toBe('123');
    });
    it('Does not cut meters when there is no decimal point', () => {
        expect(cutMeters('1235')).toBe('1235');
    });
    it('Returns 0 for empty string', () => {
        expect(cutMeters('')).toBe('0');
    });
    it('Returns 0 for string with only decimal point', () => {
        expect(cutMeters('.123')).toBe('0');
    });
    it('Returns 0 for non-numeric string', () => {
        expect(cutMeters('something')).toBe('0');
    });
});

describe('isNumber tests', () => {
    it('Identifies numbers correctly', () => {
        expect(isNumber('123')).toBe(true);
    });
    it('Identifies decimal numbers correctly', () => {
        expect(isNumber('123.123')).toBe(true);
    });
    it('Identifies decimal numbers correctly', () => {
        expect(isNumber('.1234')).toBe(true);
    });
    it('Identifies non-numbers correctly', () => {
        expect(isNumber('string')).toBe(false);
    });
    it('Identifies empty strings correctly', () => {
        expect(isNumber('')).toBe(false);
    });
    it('Identifies mix of numbers and letters correctly', () => {
        expect(isNumber('123abc')).toBe(false);
    });
    it('Identifies strings with colons correctly', () => {
        expect(isNumber('val: 123')).toBe(false);
    });
});

describe('calculateDuration tests', () => {
    it('Calculates duration correctly', () => {
        expect(calculateDurationFromTimeStamp('01:40')).toBe(100);
    });
    it('Calculates duration correctly', () => {
        expect(calculateDurationFromTimeStamp('0:30 ')).toBe(30);
    });
    it('Calculates zero duration correctly', () => {
        expect(calculateDurationFromTimeStamp('0')).toBe(0);
    });
    it('Calculates zero duration with leading spaces correctly', () => {
        expect(calculateDurationFromTimeStamp('0  ')).toBe(0);
    });
    it('Calculates zero hour and minute duration correctly', () => {
        expect(calculateDurationFromTimeStamp('0:0')).toBe(0);
    });
    it('Calculates uncomplete duration correctly', () => {
        expect(calculateDurationFromTimeStamp(':')).toBe(0);
    });
    it('Calculates duration with only minutes correctly', () => {
        expect(calculateDurationFromTimeStamp(':27')).toBe(27);
    });
    it('Calculates duration with only hours correctly', () => {
        expect(calculateDurationFromTimeStamp('2:')).toBe(120);
    });
    it('Calculates empty duration correctly', () => {
        expect(calculateDurationFromTimeStamp('')).toBe(0);
    });
    it('Throws an error for invalid duration strings', () => {
        expect(() => calculateDurationFromTimeStamp('invalid')).toThrow();
    });
    it('Throws an error for invalid duration', () => {
        expect(() => calculateDurationFromTimeStamp('114:bela')).toThrow();
    });
    it('Calculates extra long duration correctly', () => {
        expect(calculateDurationFromTimeStamp('1:2:3')).toBe(62);
    });
    it('Throws an error for invalid too long hour duration', () => {
        expect(() => calculateDurationFromTimeStamp('25:45')).toThrow();
    });
    it('Throws an error for invalid, too long minute duration', () => {
        expect(() => calculateDurationFromTimeStamp('12:60')).toThrow();
    });
});

describe('formatCurrency tests', () => {
    it('Formats integer currency correctly', () => {
        expect(formatCurrency(1234)).toBe('$1,234.00');
    });
    it('Formats decimal currency correctly', () => {
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
    it('Formats zero as currency correctly', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });
    it('Formats negative currency correctly', () => {
        expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
    it('Formats german currency correctly', () => {
        expect(formatCurrency(1234, 'de-DE', 'EUR')).toBe('1.234,00 €');
    });
    it('Formats german decimal currency correctly', () => {
        expect(formatCurrency(1234.56, 'de-DE', 'EUR')).toBe('1.234,56 €');
    });
    it('Formats german zero currency correctly', () => {
        expect(formatCurrency(0, 'de-DE', 'EUR')).toBe('0,00 €');
    });
    it('Formats german negative currency correctly', () => {
        expect(formatCurrency(-1234.56, 'de-DE', 'EUR')).toBe('-1.234,56 €');
    });
    it('Formats german currency as default USD correctly', () => {
        expect(formatCurrency(-1234.56, 'de-DE')).toBe('-1.234,56 $');
    });
});

describe('formatDateToLocal tests', () => {
    it('Formats date to default english format correctly', () => {
        expect(formatDateToLocal('2024-01-01')).toBe('Jan 1, 2024');
    });
    it('Formats date to default english format correctly', () => {
        expect(formatDateToLocal('2024-12-31')).toBe('Dec 31, 2024');
    });
    it('Formats date to default english format correctly', () => {
        expect(formatDateToLocal('2024-06-15')).toBe('Jun 15, 2024');
    });
    it('Formats date to german format correctly', () => {
        expect(formatDateToLocal('2024-01-01', 'de-DE')).toBe('1. Jan. 2024');
    });
    it('Formats date to german format correctly', () => {
        expect(formatDateToLocal('2024-12-31', 'de-DE')).toBe('31. Dez. 2024');
    });
    it('Formats date to german format correctly', () => {
        expect(formatDateToLocal('2024-06-15', 'de-DE')).toBe('15. Juni 2024');
    });
    it('Throws an error for invalid month', () => {
        expect(() => formatDateToLocal('2024-13-15', 'de-DE')).toThrow(RangeError);
    });
    it('Throws an error for invalid day', () => {
        expect(() => formatDateToLocal('2024-12-32', 'de-DE')).toThrow(RangeError);
    });
    it('Throws an error for invalid date strings', () => {
        expect(() => formatDateToLocal('invalid')).toThrow(RangeError);
    });
});

describe('calculateElapsedTime tests', () => {
    it('Calculates elapsed time correctly', () => {
        expect(calculateElapsedTime(100, 200)).toBe(100);
    });
    it('Throws an error if start is later than end', () => {
        expect(() => calculateElapsedTime(200, 100)).toThrow();
    });
    it('Calculates elapsed time correctly if start equals end', () => {
        expect(calculateElapsedTime(1200, 1200)).toBe(0);
    });
    it('Throws an error if start is negative', () => {
        expect(() => calculateElapsedTime(-100, 100)).toThrow();
    });
});

describe('Calculate and format elapsed time', () => {
    it('Calculate then format elapsed time', () => {
        expect(formatDuration(calculateElapsedTime(calculateDurationFromTimeStamp('6:40'), calculateDurationFromTimeStamp('16:43')))).toBe('10:03');
    });
});

describe('RoundElapsedTimeToHour tests', () => {
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(61, 'up')).toBe(2);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(60, 'up')).toBe(1);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(0, 'up')).toBe(0);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(59, 'up')).toBe(1);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(30, 'math')).toBe(1);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(29, 'math')).toBe(0);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(490, 'up')).toBe(9);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(490, 'math')).toBe(8);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(645, 'up')).toBe(11);
    });
    it('Rounds elapsed time up to the nearest hour correctly', () => {
        expect(roundElapsedTimeToHour(645, 'math')).toBe(11);
    });
});

describe('CalculateDailyEarning tests', () => {
    it('Calculates daily earning with up rounding correctly', () => {
        expect(calculateDailyEarning(61, 100, 'up')).toBe(200);
    });
    it('Calculates daily earning with math rounding correctly', () => {
        expect(calculateDailyEarning(645, 100, 'math')).toBe(1100);
    });
    it('Calculates daily earning with up rounding correctly', () => {
        expect(calculateDailyEarning(645, 100, 'up')).toBe(1100);
    });
    it('Calculates daily earning with up rounding correctly', () => {
        expect(calculateDailyEarning(645, 0, 'up')).toBe(0);
    });
    it('Calculates daily earning with up rounding correctly', () => {
        expect(calculateDailyEarning(0, 10, 'up')).toBe(0);
    });
    it('Calculates daily earning with up rounding correctly', () => {
        expect(calculateDailyEarning(60, 2.5, 'up')).toBe(2.5);
    });
});