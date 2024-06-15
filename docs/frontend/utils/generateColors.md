# generateColors Function Documentation

The `generateColors` function generates an array of HSL (Hue, Saturation, Lightness) color values based on the specified number of colors.

## Parameters

- `numColors` (number): Number of colors to generate.

## Returns

- An array of strings, each representing a color in the format `hsl(hue, 100%, 70%)`, where:
  - `hue` varies from 0 to 360 degrees, evenly distributed based on `numColors`.
  - Saturation is fixed at 100%.
  - Lightness is fixed at 70%.

## Example Usage

```javascript
// Import or define the generateColors function

// Example 1: Generate 6 colors
const colors6 = generateColors(6);
console.log(colors6);
// Output: [
//   'hsl(0, 100%, 70%)',
//   'hsl(60, 100%, 70%)',
//   'hsl(120, 100%, 70%)',
//   'hsl(180, 100%, 70%)',
//   'hsl(240, 100%, 70%)',
//   'hsl(300, 100%, 70%)'
// ]

// Example 2: Generate 3 colors
const colors3 = generateColors(3);
console.log(colors3);
// Output: [
//   'hsl(0, 100%, 70%)',
//   'hsl(120, 100%, 70%)',
//   'hsl(240, 100%, 70%)'
// ]

## Notes
Adjust numColors to generate the desired number of colors.
The function evenly distributes hues across the color wheel from 0 to 360 degrees.
Saturation is set to 100% to ensure vibrant colors, and lightness is set to 70% for a balanced appearance.
