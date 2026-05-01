import { describe, it, expect } from '@jest/globals';
import { formatDuration } from '../app/lib/utils';

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