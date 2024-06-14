# Track Routes Documentation

This documentation outlines the routes for managing tracks in the application. Tracks represent activities or events logged by users and are used for tracking various metrics.

## Endpoints

### POST /add

**Description:** Adds a new track for the authenticated user.

**Authorization:** Required.

**Request Body:**

- `name` (string): Name of the track.
- `type` (string): Type of the track.
- `category` (string): Category of the track.
- `amount` (number): Amount associated with the track.
- `date` (string): Date of the track (format: 'YYYY-MM-DD').

**Responses:**

- `201 Created`: Returns the newly added track.
- `500 Internal Server Error`: Server error when attempting to add the track.

### GET /list

**Description:** Retrieves all tracks for the authenticated user.

**Authorization:** Required.

**Query Parameters:**

- `type` (string, optional): Filter tracks by type.
- `category` (string, optional): Filter tracks by category.
- `month` (string, optional): Filter tracks by month (0-indexed).
- `year` (string, optional): Filter tracks by year.

**Responses:**

- `200 OK`: Returns an array of tracks.
- `500 Internal Server Error`: Server error when attempting to retrieve tracks.

### PUT /:id

**Description:** Updates a track by its ID for the authenticated user.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the track to update.

**Request Body:**

- `name` (string): Updated name of the track.
- `type` (string): Updated type of the track.
- `category` (string): Updated category of the track.
- `amount` (number): Updated amount associated with the track.
- `date` (string): Updated date of the track (format: 'YYYY-MM-DD').

**Responses:**

- `200 OK`: Returns the updated track.
- `404 Not Found`: Track not found.
- `500 Internal Server Error`: Server error when attempting to update the track.

### DELETE /:id

**Description:** Deletes a track by its ID for the authenticated user.

**Authorization:** Required.

**Parameters:**

- `id` (string): ID of the track to delete.

**Responses:**

- `200 OK`: Track successfully deleted.
- `404 Not Found`: Track not found.
- `500 Internal Server Error`: Server error when attempting to delete the track.

### GET /monthly-totals

**Description:** Retrieves monthly totals for tracks of the authenticated user.

**Authorization:** Required.

**Query Parameters:**

- `month` (string): Month to retrieve totals for (0-indexed).
- `year` (string): Year to retrieve totals for.

**Responses:**

- `200 OK`: Returns an object containing totals for each track type.
- `500 Internal Server Error`: Server error when attempting to retrieve monthly totals.
