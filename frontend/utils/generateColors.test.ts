import { generateColors } from '@/utils/generateColors';

describe('generateColors', () => {
    it('returns the correct number of colors', () => {
        const numColors = 5;
        const colors = generateColors(numColors);
        expect(colors).toHaveLength(numColors);
    });

    it('returns colors in the correct format', () => {
        const numColors = 3;
        const colors = generateColors(numColors);
        colors.forEach((color) => {
            expect(color).toMatch(/^hsl\(\d+, 100%, 70%\)$/);
        });
    });

    it('returns an empty array if numColors is 0', () => {
        const colors = generateColors(0);
        expect(colors).toEqual([]);
    });

    it('returns one color if numColors is 1', () => {
        const colors = generateColors(1);
        expect(colors).toHaveLength(1);
        expect(colors[0]).toMatch(/^hsl\(\d+, 100%, 70%\)$/);
    });

    it('returns a large number of colors correctly', () => {
        const numColors = 100;
        const colors = generateColors(numColors);
        expect(colors).toHaveLength(numColors);
    });

    it('generates colors with correct hue values', () => {
        const numColors = 4;
        const colors = generateColors(numColors);
        const expectedHues = [0, 90, 180, 270]; // Hue values for 4 colors
        colors.forEach((color, index) => {
            const hue = parseInt(color.match(/\d+/)![0]);
            expect(hue).toBeCloseTo(expectedHues[index], 0); // Allowing for some rounding
        });
    });
});
