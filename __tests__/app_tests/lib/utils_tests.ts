import { describe, it, expect } from '@jest/globals';
import { formatDuration, cutMeters, isNumber } from '../../../app/lib/utils';

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

