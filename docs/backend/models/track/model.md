# Track Schema Documentation

This documentation outlines the schema definition of the track entity used in the application.

## Schema Structure

The track schema defines the structure of a track entity in the application. It includes the following fields:

- `userId`: The unique identifier of the user associated with the track. It is of type `mongoose.Schema.Types.ObjectId` and is required.
- `date`: The date of the track. It is of type `Date` and is required.
- `amount`: The amount involved in the track. It is of type `string` and is required.
- `type`: The type of the track, which is either 'Expense' or 'Income'. It is of type `string` and is required.
- `category` (optional): The category of the track. It is of type `string`.
- `account` (optional): The account associated with the track. It is of type `string`.
- `note` (optional): A note for additional details about the track. It is of type `string`.
- `from` (optional): A field for transfers indicating the source. It is of type `string`.
- `to` (optional): A field for transfers indicating the destination. It is of type `string`.
- `description` (optional): A description of the track. It is of type `string`.

## Usage

The track schema can be used to define track objects in the application. Below is an example of how to define a track schema using this interface:

```typescript
import mongoose, { Schema } from "mongoose";

// Track schema definition
const trackSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    amount: { type: String, required: true },
    type: { type: String, required: true }, // Assuming this is either 'Expense' or 'Income'
    category: { type: String, required: false },
    account: { type: String, required: false },
    note: { type: String, required: false },
    from: { type: String, required: false },
    to: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);
```
