# Database Connection Documentation

This documentation outlines how to establish a connection to the MongoDB database using Mongoose.

## Overview

The `dbConnection` function connects to the MongoDB database using the URI specified in the configuration file. It utilizes the Mongoose library for MongoDB interactions.

## Dependencies

- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment

## Functionality

The `dbConnection` function establishes a connection to the MongoDB database using the URI provided in the configuration file (`config.ts` or `config.js`). Upon successful connection, it logs a confirmation message. If an error occurs during the connection process, it logs an error message.

## Usage

Ensure that the MongoDB URI is correctly specified in the configuration file (`config.ts` or `config.js`). Then, call the `dbConnection` function to establish the database connection.

```typescript
import { dbConnection } from "./dbConnection";

// Call the dbConnection function to establish the database connection
dbConnection()
  .then(() => {
    // Perform operations that require database connection
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
```
