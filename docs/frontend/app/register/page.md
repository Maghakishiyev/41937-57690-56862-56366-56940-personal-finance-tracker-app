# RegisterPage Component Documentation

## Overview

The `RegisterPage` component allows users to register for a new account. It includes a form for entering email, password, and confirming password details, along with error handling and redirection upon successful registration.

## Dependencies

- React: JavaScript library for building user interfaces.
- Next.js: React framework for server-rendered applications.
- Axios: Promise-based HTTP client for making API requests.
- `useEffect` and `useState` hooks: React hooks for managing component side effects and local state.
- `Image` component from Next.js: Used for optimized image loading.
- `EnvelopeIcon` and `LockClosedIcon` components: Custom icons for email and password fields.
- `signUp` function from `./api`: Function responsible for making a POST request to the backend API endpoint for user registration.
- `useRouter` hook from `next/navigation`: Used for programmatic navigation.
- `useSnapshot` hook from `valtio`: Used for accessing and subscribing to state in a Valtio store.
- `UserState` and `set*` functions from `@/store/UserStore`: State management and actions related to user state.

## Constants

- No specific constants are defined within the component. It imports `API_BASE_URL` from `./api` for backend API URL configuration.

## Component: `RegisterPage`

### Description

The `RegisterPage` component renders a registration form, handles form submissions, performs client-side validation, and communicates with the backend to register new users.

### Local State

- `formData`: Manages the state of form data including `email`, `password`, and `confirmPassword`.
- `fieldErrors`: Manages boolean flags for field validation errors (`email`, `password`, `confirmPassword`).
- `errorMessage`: Stores error messages from failed registration attempts.

### Hooks Usage

- `useEffect`: Redirects authenticated users to the profile page (`/profile`) and fetches necessary data upon component mount.
- `useState`: Manages local component state (`formData`, `fieldErrors`, `errorMessage`).
- `useRouter`: Handles programmatic navigation to other pages within the application.
- `useSnapshot`: Retrieves the current snapshot of `UserState` from the Valtio store.

### Form Handling

- `handleChange`: Updates `formData` and validates each form field on change.
- `handleSubmit`: Handles form submission, performs client-side validation, calls `signUp` function for API interaction, and updates local state (`errorMessage`, `isUserLoading`, `isUserLoggedIn`).

### UI Components

- Uses various UI components including icons (`EnvelopeIcon`, `LockClosedIcon`), images (`Image`), and custom styled components for layout and presentation.

### Example Usage

```typescript
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { signUp } from './api';
import { UserState, IUser, setIsUserLoading, setIsUserLoggedIn, setUser, IUserState } from '@/store/UserStore';

const RegisterPage = () => {
    // Component implementation...
};

export default RegisterPage;

## Notes
Ensure all imported components (Image, EnvelopeIcon, LockClosedIcon, etc.) are correctly configured and imported within your project.
Customize form validation, error handling, and styling as per your application requirements.
Adjust API_BASE_URL in ./api to match your actual backend API URL.
Handle security considerations such as password hashing and secure transmission of user data based on your application's security requirements