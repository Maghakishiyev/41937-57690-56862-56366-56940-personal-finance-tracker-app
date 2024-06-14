# Category Routes Documentation

This documentation outlines the routes for managing categories in the application. These routes handle operations such as listing, retrieving, updating, and deleting categories.

## Endpoints

### GET /list/get

**Description:** Retrieves all categories for the authenticated user.

**Authorization:** Required.

**Query Parameters:**

- `type` (string, optional): Filter categories by type.

**Responses:**

- `200 OK`: Returns an array of categories.
- `500 Internal Server Error`: Server error when attempting to retrieve categories.

### GET /:id/get

**Description:** Retrieves a category by its ID for the authenticated user.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the category to retrieve.

**Responses:**

- `200 OK`: Returns the requested category.
- `404 Not Found`: Category not found.
- `500 Internal Server Error`: Server error when attempting to retrieve the category.

### PUT /:id

**Description:** Updates a category by its ID for the authenticated user.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the category to update.

**Request Body:**

- `name` (string): Updated name of the category.
- `icon` (string): Updated icon of the category.
- `type` (string): Updated type of the category.
- `description` (string): Updated description of the category.

**Responses:**

- `200 OK`: Returns the updated category.
- `404 Not Found`: Category not found.
- `409 Conflict`: Another category with the same name and type already exists.
- `500 Internal Server Error`: Server error when attempting to update the category.

### DELETE /:id

**Description:** Deletes a category by its ID for the authenticated user.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the category to delete.

**Responses:**

- `200 OK`: Category successfully deleted.
- `404 Not Found`: Category not found.
- `500 Internal Server Error`: Server error when attempting to delete the category.

### POST /add

**Description:** Adds a new category for the authenticated user.

**Authorization:** Required.

**Request Body:**

- `name` (string): Name of the category.
- `icon` (string): Icon of the category.
- `type` (string): Type of the category.
- `description` (string): Description of the category.

**Responses:**

- `201 Created`: Returns the newly added category.
- `409 Conflict`: Category with the same name and type already exists.
- `500 Internal Server Error`: Server error when attempting to add the category.
