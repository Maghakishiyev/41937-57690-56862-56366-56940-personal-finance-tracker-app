# Categories API Documentation

## Overview

This documentation outlines the functions and interfaces used to interact with the categories API. The functions utilize `axios` for making HTTP requests to manage categories.

## Configuration

- `API_BASE_URL`: The base URL for category-related API endpoints. Adjust the value `'http://localhost:8080/api/categories'` to match your backend's category routes.

## Functions

### `addCategory(category: ICategoryContent)`

Adds a new category.

#### Parameters

- `category` (`ICategoryContent`): The category data to be added.

#### Returns

- A promise that resolves to the response data from the API.

#### Throws

- An error with a message from the API response or a generic error message.

#### Usage

```javascript
import { addCategory } from './path/to/categoriesApi';

const category = { /* category data */ };
addCategory(category)
    .then(data => {
        console.log('Category added successfully:', data);
    })
    .catch(error => {
        console.error('Error adding category:', error.message);
    });

## Notes
Ensure that the ICategory and ICategoryContent interfaces are correctly defined and imported from @/store/CategoriesStore.
Adjust API_BASE_URL to match your backend's actual category routes.

## Error Handling
All functions handle errors using axios's error handling capabilities. Ensure proper error messages are displayed to the user or logged for debugging purposes.
