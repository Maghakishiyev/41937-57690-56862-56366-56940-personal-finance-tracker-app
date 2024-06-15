import { shortenString } from './ShortenString';

describe('shortenString', () => {
    it('shortens a string correctly', () => {
        const input = 'abcdefghijklmnopqrstuvwxyz';
        const result = shortenString(input, 5, 5);
        expect(result).toBe('abcde...vwxyz');
    });

    it('handles empty string input', () => {
        const input = '';
        const result = shortenString(input, 3, 3);
        expect(result).toBe('...');
    });

    it('handles case where start or end length is zero', () => {
        const input = 'abcdefgh';
        const result1 = shortenString(input, 0, 4);
        const result2 = shortenString(input, 4, 0);
        expect(result1).toBe('...efgh');
        expect(result2).toBe('abcd...');
    });
});
