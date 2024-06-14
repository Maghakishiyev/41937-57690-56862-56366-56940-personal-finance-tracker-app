# Account Model Documentation

This documentation provides details about the account model used in the application.

## Model Structure

The account model defines the structure of an account entity in the application. It contains the following fields:

- `userId`: The unique identifier of the user who owns the account. It is of type `mongoose.Schema.Types.ObjectId` and is required.
- `name`: The name of the account. It is of type `string` and is required.
- `emoji`: An emoji associated with the account. It is of type `string` and is required.
- `description` (optional): A brief description of the account. It is of type `string`.

## Usage

To use the account model in your application, you can import it from the specified module and define your account schema based on this model. Here's an example of how to define an account schema using Mongoose:

```typescript
import mongoose, { Schema } from "mongoose";
import { IAccount } from "./interface";

const accountSchema = new Schema<IAccount>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  description: { type: String },
});

export const Account = mongoose.model<IAccount>("Account", accountSchema);
```
