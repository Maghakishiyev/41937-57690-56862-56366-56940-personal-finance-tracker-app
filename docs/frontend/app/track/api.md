# Tracks API Service Documentation

## Overview

This document describes the API service functions used for handling tracks data. The service includes functions for fetching, adding, updating, and deleting track records, as well as fetching monthly totals.

## API Endpoints

All endpoints are relative to `http://localhost:8080/api/tracks` (replace with the actual backend base URL).

## Functions

### `getTracks`

Fetches a list of tracks based on optional filters.

**Parameters:**

- `type` (optional): Type of track (`expense` or `income`).
- `category` (optional): Category of track.
- `month` (optional): Month of the track (0-11).
- `year` (optional): Year of the track.

**Returns:**
- A promise that resolves to an array of tracks.

```typescript
export const getTracks = async ({
    type,
    category,
    month,
    year,
}: TGetTracksProsps): Promise<ITrack[]> => {
    try {
        const params = new URLSearchParams();
        const token = localStorage.getItem('token');

        if (type) params.append('type', type);
        if (category) params.append('category', category);
        if (month) params.append('month', month.toString());
        if (year) params.append('year', year.toString());

        const response = await axios.get(`${API_BASE_URL}/list`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Assuming the server sends back an array of tracks
    } catch (error) {
        console.error('Failed to fetch tracks:', error);
        throw error; // Re-throw the error for handling it in the UI layer
    }
};
## Error Handling
Each function catches errors and logs them to the console. Errors are then re-thrown to be handled at a higher level in the application.
