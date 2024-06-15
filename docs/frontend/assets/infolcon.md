# InfoIcon Component Documentation

The `InfoIcon` component is a React functional component that renders an informational icon in the form of an "i" inside a circle.

## Props

### `IInfoIcon` Interface

| Prop       | Type     | Default     | Description                                     |
|------------|----------|-------------|-------------------------------------------------|
| `className`| string   | `undefined` | Custom class names to apply to the SVG element. |
| `fillColor`| string   | `'#7D8395'` | Color to fill the icon.                         |

## Usage

The `InfoIcon` component can be imported and used in any React application or component.

### Example

```jsx
import React from 'react';
import { InfoIcon } from './InfoIcon'; // Adjust the import path as necessary

const ExampleInfoComponent = () => {
    return (
        <div>
            <h2>Info Icon Example</h2>
            <InfoIcon className="text-blue-500" fillColor="blue" />
        </div>
    );
};

export default ExampleInfoComponent;

The InfoIcon component is imported from its file location.
It is rendered with a custom class name (text-blue-500) and a fillColor of "blue".

## Notes
Ensure the fillColor matches the desired color scheme of your application or adjust it dynamically based on your needs.
Customize className to adjust the size or other visual properties of the SVG icon.