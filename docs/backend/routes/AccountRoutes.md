# Account Routes

This document provides details on the account management routes for an Express application interfacing with MongoDB. These routes handle creating, retrieving, updating, and deleting user accounts, secured with authentication middleware.

## Modules Required

- `express`: Framework for handling routing.
- `Request`, `Response`: Used to define the Express request and response objects.
- `Account`: Mongoose model for the account.
- `ReqWithUser`, `authCheck`: Custom middleware for authentication and adding user context to requests.

## Routes

### POST /add

**Description:** Adds a new account for the authenticated user.

**Authorization:** Required.

**Body:**
- `name` (string): Name of the account.
- `emoji` (string): Emoji associated with the account.
- `description` (string, optional): A brief description of the account.

**Responses:**
- `201 Created`: Account successfully created.
- `409 Conflict`: An account with the same name and emoji already exists.
- `500 Internal Server Error`: Server error when attempting to add the account.

### GET /list/get

**Description:** Retrieves all accounts associated with the authenticated user.

**Authorization:** Required.

**Responses:**
- `200 OK`: Successfully retrieved the list of accounts. Returns an array of account objects.
- `500 Internal Server Error`: Server error when attempting to retrieve accounts.

### PUT /update/:accountId

**Description:** Updates the specified account for the authenticated user.

**Authorization:** Required.

**Parameters:**
- `accountId` (string): The ID of the account to update.

**Body:**
- `name` (string): Updated name of the account.
- `emoji` (string): Updated emoji for the account.
- `description` (string, optional): Updated description of the account.

**Responses:**
- `200 OK`: Account successfully updated. Returns the updated account object.
- `404 Not Found`: No account found with the specified ID.
- `409 Conflict`: An account with the same name and emoji already exists.
- `500 Internal Server Error`: Server error when attempting to update the account.

### DELETE /delete/:accountId

**Description:** Deletes the specified account for the authenticated user.

**Authorization:** Required.

**Parameters:**
- `accountId` (string): The ID of the account to delete.

**Responses:**
- `200 OK`: Account successfully deleted.
- `404 Not Found`: No account found with the specified ID.
- `500 Internal Server Error`: Server error when attempting to delete the account.

## Implementation Notes

- All routes are protected by the `authCheck` middleware, which ensures that only authenticated users can access the routes.
- The middleware also adds a `user` object to the request, which includes the `userId`, used to associate accounts with users.

## Error Handling

- Each route has built-in error handling that responds with appropriate HTTP status codes and error messages based on the encountered issue.
