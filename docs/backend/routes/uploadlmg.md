# Image Upload Routes Documentation

This documentation outlines the routes for uploading images to an AWS S3 bucket.

## Endpoints

### POST /img

**Description:** Uploads an image to an AWS S3 bucket.

**Authorization:** Required.

**Request Body:**

- `imageFile` (file): Image file to be uploaded.

**Responses:**

- `200 OK`: Returns the URL of the uploaded image.
- `400 Bad Request`: No file uploaded.
- `500 Internal Server Error`: Failed to upload the file.

## Implementation Notes

- Images are uploaded to the configured AWS S3 bucket.
- Authentication middleware (`authCheck`) ensures that only authenticated users can upload images.
- Multer is used for handling file uploads.
- The AWS SDK (`@aws-sdk/client-s3`) is used for interacting with the S3 bucket.

## Example Usage

```typescript
import express from "express";
import multer from "multer";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "../configs";
import { authCheck } from "../middleware";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3Client = new S3Client({
  region: config.bucket_region,
  credentials: {
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
  },
});

router.post("/img", authCheck, upload.single("imageFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  const file = req.file;

  const key = `${Date.now()}_${file.originalname}`;

  try {
    const command = new PutObjectCommand({
      Bucket: config.bucket_name,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command).then((res) => {});

    const link = `https://${config.bucket_name}.s3.${config.bucket_region}.amazonaws.com/${key}`;
    res.send({ url: link });
  } catch (error) {
    console.error("S3 upload error:", error);
    res.status(500).send({ error: "Failed to upload file" });
  }
});

export default router;
```
