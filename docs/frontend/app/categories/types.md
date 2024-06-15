# CategoriesResponseData Interface Documentation

## Overview

The `CategoriesResponseData` interface defines the structure of the response data received from category-related API calls. It includes user information and an authentication token.

## Dependencies

- `IUser` from `@/store/UserStore`

## Interface: `CategoriesResponseData`

### Properties

- `user`: An object implementing the `IUser` interface. It represents the user associated with the categories.
- `token`: A string representing the authentication token.

### Example Usage

Here's an example of how the `CategoriesResponseData` interface might be used in a function that fetches categories:

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

##Notes
Ensure that the IUser interface is correctly defined and imported from @/store/UserStore.
This interface is used to type the response data from category-related API endpoints, which includes both user information and an authentication token.
