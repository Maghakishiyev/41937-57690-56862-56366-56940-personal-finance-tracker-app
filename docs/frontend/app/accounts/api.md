# User Accounts API Documentation

## Overview

This documentation provides an overview of the functions available for managing user accounts in the application. The functions use `axios` for making HTTP requests to the backend API.

## Configuration

- `API_BASE_URL`: The base URL for the backend API. Replace `'http://localhost:8080/api/'` with the actual backend base URL.

## Functions

### `addAccountToUser(account: IUserAccountContent)`

Adds a new account to the user.

#### Parameters

- `account` (`IUserAccountContent`): The account data to be added.

#### Returns

- A promise that resolves to the response data from the API.

#### Throws

- An error with a message from the API response or a generic error message.

#### Usage

## Error Hadling

-All functions throw errors with a message derived from the API response or a generic error message if the API response does not contain a message. The errors can be caught and handled appropriately in the calling code.