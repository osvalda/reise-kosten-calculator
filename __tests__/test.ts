import { describe, it, expect } from '@jest/globals';
import { formatTime } from '../app/lib/utils';

describe('24h time format Hour validity tests', () => {
    it('Empty is accepted', () => {
        expect(formatTime('')).toBe('');
    });
});