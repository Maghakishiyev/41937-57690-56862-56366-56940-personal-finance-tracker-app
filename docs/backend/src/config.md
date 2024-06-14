# Configuration Documentation

This documentation outlines the configuration setup for the application, including database URI and JWT secret.

## Overview

The configuration setup involves loading environment variables from a `.env` file using the `dotenv` package. It defines an interface `Config` to structure the configuration properties.

## Dependencies

- `dotenv`: Loads environment variables from a `.env` file into `process.env`

## Configuration Properties

### `databaseUri`

- Type: string
- Description: MongoDB URI for database connection
- Default Value: 'default_database_uri'

### `jwtSecret`

- Type: string
- Description: Secret key for JWT token generation and validation
- Default Value: 'default_jwt_secret'

## Usage

To use the configuration in your application, ensure that the `.env` file contains the necessary environment variables:
