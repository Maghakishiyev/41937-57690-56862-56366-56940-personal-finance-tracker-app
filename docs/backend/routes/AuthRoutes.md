# User Authentication and Management API Documentation

This documentation covers the user authentication and management API implemented using Express.js, bcryptjs, and JWT. The API offers endpoints for user sign-in, sign-up, and updating user data.

## Endpoints

### POST /signin

**Description:** Authenticates a user with their email and password, returning a JWT token upon successful authentication.

**Authorization:** Not required.

**Request Body:**

- `email` (string): User's email address.
- `password` (string): User's password.

**Responses:**

- `200 OK`: Returns the authenticated user's data and a JWT token.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: Server error.

### POST /signup

**Description:** Registers a new user with an email and password, initializes default categories and accounts, and returns a JWT token upon successful registration.

**Authorization:** Not required.

**Request Body:**

- `email` (string): User's email address.
- `password` (string): User's password.

**Responses:**

- `201 Created`: Returns the registered user's data and a JWT token.
- `500 Internal Server Error`: Error creating the user.

### PUT /user/:id

**Description:** Updates the details of the specified user. Requires authentication.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the user to update.

**Request Body:**

- `email` (string): Updated email address of the user.
- `firstName` (string): Updated first name of the user.
- `lastName` (string): Updated last name of the user.
- `userName` (string): Updated username of the user.
- `birthday` (string): Updated birthday of the user.
- `imageFile` (string): Updated image file of the user.

**Responses:**

- `200 OK`: User successfully updated. Returns the updated user's data.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Server error when attempting to update the user.

## Middleware

### `authCheck`

This middleware function ensures that only authenticated users can access certain routes.

## Utilities

### `hashPassword`

This utility function hashes a plain text password using bcryptjs.

## Models

### `User`

The User model represents a user in the system, including fields such as `email`, `password`, and `_id`.

### `Category`

The Category model represents a category associated with a user.

### `Account`

The Account model represents an account associated with a user.

### Default Categories and Accounts

The `DEFAULT_CATEGORIES` and `DEFAULT_ACCOUNTS` arrays contain predefined sets of categories and accounts, respectively, that are initialized for a new user upon registration.

## Error Handling

The API includes built-in error handling for responding with appropriate HTTP status codes and error messages.
