# Default Accounts Documentation

This documentation explains the usage and purpose of the `DEFAULT_ACCOUNTS` constant.

## Overview

The `DEFAULT_ACCOUNTS` constant is an array of default account objects. Each account object contains properties such as `name`, `emoji`, and `description`, representing different types of accounts commonly used in financial applications.

## Usage

The `DEFAULT_ACCOUNTS` constant can be used as a predefined set of accounts when initializing a financial application or setting up default account options for users.

### Example Usage

```typescript
import { DEFAULT_ACCOUNTS } from "./constants";

// Example usage: Initialize default accounts for a user
const userAccounts = DEFAULT_ACCOUNTS.map((account) => {
  return {
    name: account.name,
    balance: 0, // Initial balance
    ...account, // Include other properties such as emoji and description
  };
});

console.log(userAccounts);
```
