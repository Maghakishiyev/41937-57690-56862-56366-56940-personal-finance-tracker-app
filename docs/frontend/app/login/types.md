# User Authentication Interfaces Documentation

## Overview

This document defines TypeScript interfaces used for user authentication data in a web application.

## Interfaces

### `SigninRequestData`

Represents the data required for user sign-in.

#### Properties

- `email`: A string representing the user's email address.
- `password`: A string representing the user's password.

#### Example

```typescript
export interface SigninRequestData {
    email: string;
    password: string;
}

## Notes
Ensure that IUser interface from '@/store/UserStore' is correctly defined and imported in your project.
Adjust property names and types as per your specific authentication implementation and backend API response structure.