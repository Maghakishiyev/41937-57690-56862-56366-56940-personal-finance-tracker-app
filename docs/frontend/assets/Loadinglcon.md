# LoadingIcon Component Documentation

The `LoadingIcon` component is a React functional component that renders a loading spinner with multiple colored segments.

## Props

### `ILoadingIconProps` Interface

| Prop       | Type     | Default             | Description                                     |
|------------|----------|---------------------|-------------------------------------------------|
| `className`| string   | `'w-6 h-6 flex-shrink-0'` | Custom class names to apply to the SVG element. |

## Usage

The `LoadingIcon` component can be imported and used in any React application or component.

### Example

```jsx
import React from 'react';
import { LoadingIcon } from './LoadingIcon'; // Adjust the import path as necessary

const ExampleLoadingComponent = () => {
    return (
        <div>
            <h2>Loading Icon Example</h2>
            <LoadingIcon className="text-blue-500" />
        </div>
    );
};

export default ExampleLoadingComponent;

The LoadingIcon component is imported from its file location.
It is rendered with a custom class name (text-blue-500).

## Notes
Customize className to adjust the size or other visual properties of the SVG icon.
The spinner consists of multiple colored segments to create a loading effect