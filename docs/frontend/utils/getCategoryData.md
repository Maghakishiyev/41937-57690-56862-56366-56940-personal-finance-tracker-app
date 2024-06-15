# getCategoryData Function Documentation

The `getCategoryData` function processes a list of tracks and user-defined categories to generate summaries of category data.

## Parameters

- `tracks` (Array of `ITrack`): An array of track objects containing financial data.
- `userCategories` (Array of `ICategory`): An array of user-defined category objects.

## Returns

- An array of `CategorySummary` objects, each containing summarized data for a category, including:
  - `icon` (string): Optional icon associated with the category.
  - `name` (string): Name of the category.
  - `category` (string): ID of the category.
  - `totalAmount` (number): Total amount spent in the category.
  - `percentage` (number): Percentage of the total amount spent in the category.
  - `color` (string): Color assigned to the category for visualization purposes.

## Example Usage

```javascript
// Import or define getCategoryData function and other dependencies

// Example usage with mock data
const tracks = [
    { id: '1', category: 'food', amount: '25.50' },
    { id: '2', category: 'transport', amount: '15.75' },
    { id: '3', category: 'food', amount: '10.00' },
    // Add more tracks as needed
];

const userCategories = [
    { _id: 'food', name: 'Food', icon: '🍔' },
    { _id: 'transport', name: 'Transport', icon: '🚗' },
    // Add more user-defined categories as needed
];

const categorySummaries = getCategoryData(tracks, userCategories);
console.log(categorySummaries);
// Example output:
// [
//   { icon: '🍔', name: 'Food', category: 'food', totalAmount: 35.50, percentage: 70, color: '#...'},
//   { icon: '🚗', name: 'Transport', category: 'transport', totalAmount: 15.75, percentage: 30, color: '#...'}
// ]

## Notes
Adjust tracks and userCategories with real data structures based on your application's needs.
The function calculates total amounts and percentages for each category based on the provided tracks.
Uses the generateColors function to assign colors dynamically to each category summary.
Ensure generateColors is imported or defined in the same context as getCategoryData for proper functionality.