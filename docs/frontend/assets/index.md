# Icon Components Documentation

This repository contains several icon components that can be used in React applications. Each icon serves a specific purpose and can be easily integrated into your project.

## List of Icons

### LoadingIcon

The `LoadingIcon` component displays a loading spinner or animation to indicate that content is being fetched or processed asynchronously.

#### Usage

```jsx
import { LoadingIcon } from './LoadingIcon'; // Adjust the import path as necessary

const ExampleLoadingComponent = () => {
    return (
        <div>
            <h2>Loading Example</h2>
            <LoadingIcon />
        </div>
    );
};

export default ExampleLoadingComponent;

## InfoIcon
The InfoIcon component provides an informational icon, typically used to indicate additional details or help information.

## ArrowChartUp
The ArrowChartUp component renders an upward-pointing arrow, commonly used to represent positive trends or increases in data.

## Notes
Adjust the import paths ('./LoadingIcon', './InfoIcon', './ArrowChartUp') based on your project structure.
Each icon component accepts props for customization such as className, fillColor, etc., depending on its specific implementation.
Ensure to handle dependencies and versioning properly if these icons depend on other components or libraries.