# Category Model Documentation

This documentation outlines the structure and usage of the category model in the application.

## Model Structure

The category model defines the structure of a category entity in the application. It includes the following fields:

- `name`: The name of the category. It is of type `string` and is required.
- `icon`: The icon associated with the category. It is of type `string` and is required.
- `type`: The type of the category. It is of type `string` and is required.
- `description` (optional): A brief description of the category. It is of type `string`.
- `userId`: The unique identifier of the user to whom the category belongs. It is of type `mongoose.Schema.Types.ObjectId` and is required.

## Usage

To utilize the category model in your application, import it from the specified module and define your category schema based on this model. Below is an example of defining a category schema using Mongoose:

```typescript
import mongoose, { Schema } from "mongoose";
import { ICategory } from "./interface";

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
```
