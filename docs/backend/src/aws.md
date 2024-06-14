# File Upload to AWS S3 Documentation

This documentation outlines the functionality of the file upload feature to AWS S3 using Express and multer.

## Overview

The file upload functionality allows users to upload files to an AWS S3 bucket using an Express server. It utilizes the multer middleware for handling file uploads and the AWS SDK to interact with S3.

## Dependencies

- `express`: Web framework for Node.js
- `aws-sdk`: AWS SDK for JavaScript
- `multer`: Middleware for handling multipart/form-data
- `fs`: File system module for Node.js

## Configuration

The AWS SDK is configured with the access key ID, secret access key, and region obtained from the application configuration file (`config.ts`). The multer middleware is configured to store uploaded files in the local filesystem (`uploads/` directory).

## Functionality

### `uploadFileToS3` Function

This function reads the file content from the specified file path, constructs the S3 upload parameters, and uploads the file to the specified S3 bucket. It returns the URL of the uploaded file on success.

### `/upload` Endpoint

This endpoint handles POST requests for uploading files. It expects a single file upload with the field name `file`. Upon receiving a request, it saves the uploaded file to the local filesystem, constructs the S3 key for the file, uploads the file to S3 using the `uploadFileToS3` function, deletes the temporary file from the local filesystem, and responds with the URL of the uploaded file.

## Usage

To use the file upload functionality in your Express application, import the router and mount it on a specific route in your application.

```typescript
import express from "express";
import fileUploadRouter from "./fileUploadRouter";

const app = express();

app.use("/api/upload", fileUploadRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
