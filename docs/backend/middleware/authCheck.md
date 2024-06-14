# Authentication Middleware Documentation

This documentation provides details on the authentication middleware used in the application.

## Middleware Overview

The authentication middleware is responsible for verifying JWT tokens sent with requests to protected routes. It ensures that only authenticated users can access certain endpoints.

## Middleware Functionality

### `authCheck`

- **Functionality:** Verifies JWT tokens and adds user information to the request object.
- **Parameters:**
  - `req`: Express request object.
  - `res`: Express response object.
  - `next`: Express next function.
- **Steps:**
  1. Extracts the JWT token from the `Authorization` header in the request.
  2. Verifies the token using the JWT secret key configured in the application.
  3. If the token is valid and properly decoded, adds the user information to the request object.
  4. If the token is invalid or the decoding fails, sends an appropriate HTTP status code (401 or 403) indicating unauthorized access.

### `isDecodedUser`

- **Functionality:** Checks if the decoded JWT payload contains the expected user properties.
- **Parameters:**
  - `object`: Decoded JWT payload.
- **Returns:** Boolean value indicating whether the object is a valid decoded user.
- **Steps:**
  1. Validates if the input object is an object and contains the `userId` property.

## Usage

To protect a route, simply apply the `authCheck` middleware to the route handler function.

```typescript
import { authCheck, ReqWithUser } from "../middleware";

router.get("/protected-route", authCheck, (req: ReqWithUser, res: Response) => {
  // Access authenticated user information through req.user
  const userId = req.user?.userId;
  // Proceed with route logic...
});
```
