# Configuration Documentation

This documentation outlines the configuration parameters used in the application.

## Environment Variables

The application relies on environment variables for configuration. These variables are typically set in a `.env` file.

- `port`: The port number on which the server will listen.
- `JWT_SECRET`: The secret key used for JWT token generation.
- `MONGO_URI`: The MongoDB connection URI.
- `BUCKET_NAME`: The name of the AWS S3 bucket for file storage.
- `BUCKET_REGION`: The region of the AWS S3 bucket.
- `AWS_ACCESS_KEY`: The AWS access key for S3 bucket access.
- `AWS_SECRET_KEY`: The AWS secret key for S3 bucket access.

## Default Values

If an environment variable is not provided, the application falls back to default values.

- `JWT_SECRET`: '-|your@_@default@_@secret|-'

## Example .env File

```plaintext
port=3000
JWT_SECRET=my_secret_key
MONGO_URI=mongodb://localhost:27017/mydatabase
BUCKET_NAME=my-bucket-name
BUCKET_REGION=us-east-1
AWS_ACCESS_KEY=my-access-key
AWS_SECRET_KEY=my-secret-key
```
