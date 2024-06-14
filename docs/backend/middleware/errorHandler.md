# Error Handling Middleware Documentation

This documentation provides details on the error handling middleware used in the application.

## Middleware Overview

The error handling middleware is responsible for catching and handling errors that occur during request processing. It formats the error response and sends it back to the client.

## Middleware Functionality

### `errorHandler`

- **Functionality:** Formats error responses and sends them back to the client.
- **Parameters:**
  - `err`: Error object.
  - `req`: Express request object.
  - `res`: Express response object.
  - `next`: Express next function.
- **Steps:**
  1. Extracts the status code from the error object or sets it to 500 (Internal Server Error) by default.
  2. Formats the error response with the error message and stack trace (if in development mode).
  3. Sends the formatted error response to the client with the appropriate status code.

## Usage

To handle errors globally in your application, apply the `errorHandler` middleware after all other middleware and route handlers.

```typescript
import errorHandler from "../middleware/errorHandler";

// Apply errorHandler middleware
app.use(errorHandler);
```
