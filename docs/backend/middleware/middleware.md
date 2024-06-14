# Middleware Module Documentation

This documentation provides an overview of the middleware modules exported by the application.

## Middleware Modules

### `authCheck`

- **Functionality:** Middleware for checking authentication.
- **Usage:** Verifies the presence of a valid authentication token in the request headers. If the token is valid, it decodes the user information and attaches it to the request object (`ReqWithUser`). If the token is invalid or missing, it sends an appropriate HTTP response (401 Unauthorized or 403 Forbidden).
- **Exports:** `authCheck`

### `errorHandler`

- **Functionality:** Middleware for handling errors.
- **Usage:** Formats error responses and sends them back to the client. It extracts the status code from the error object or sets it to 500 (Internal Server Error) by default. It formats the error response with the error message and stack trace (if in development mode) and sends it to the client with the appropriate status code.
- **Exports:** `errorHandler`

## Usage

To use these middleware modules in your application, import them as needed and apply them to the appropriate routes or globally in your Express application.

```typescript
import { authCheck } from "../middleware/authCheck";
import errorHandler from "../middleware/errorHandler";

// Apply authCheck middleware to specific routes
router.post("/protected-route", authCheck, (req, res) => {
  // Route handling logic
});

// Apply errorHandler middleware globally
app.use(errorHandler);
```
