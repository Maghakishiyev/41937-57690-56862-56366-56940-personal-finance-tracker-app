export function generateColors(numColors: number) {
    const colors = [];
    const step = 360 / numColors; // Divide the color wheel into equal parts

    for (let i = 0; i < numColors; i++) {
        const hue = i * step;
        colors.push(`hsl(${hue}, 100%, 70%)`); // 100% saturation, 70% lightness
    }

    return colors;
}
