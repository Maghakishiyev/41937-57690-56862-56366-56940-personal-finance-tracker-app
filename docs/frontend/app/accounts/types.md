# CategoriesResponseData Interface Documentation

## Overview

This documentation provides details on the `CategoriesResponseData` interface, which is used to structure the response data for category-related API calls. The interface includes user information and an authentication token.

## Dependencies

- `IUser` from `@/store/UserStore`

## Interface: `CategoriesResponseData`

### Properties

- `user`: An object implementing the `IUser` interface.
- `token`: A string representing the authentication token.

### Example Usage

Here is an example of how the `CategoriesResponseData` interface might be used in a function that fetches categories:

```typescript
import axios from 'axios';
import { CategoriesResponseData } from './path/to/CategoriesResponseData';

async function fetchCategories(): Promise<CategoriesResponseData> {
    try {
        const response = await axios.get<CategoriesResponseData>('api/categories');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
}

## Notes 
Ensure that the IUser interface is correctly defined and imported from @/store/UserStore.
This interface is used to type the response data from category-related API endpoints, which includes both user information and an authentication token.