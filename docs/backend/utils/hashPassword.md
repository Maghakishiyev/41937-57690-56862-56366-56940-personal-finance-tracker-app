# Password Hashing Documentation

This documentation outlines the process of hashing passwords using bcrypt in a Node.js application.

## Overview

The provided code demonstrates how to hash passwords securely using the bcrypt library in a Node.js application. Password hashing is a crucial security measure to protect user passwords stored in databases.

## Dependencies

- `bcryptjs`: Library for hashing passwords securely using bcrypt algorithm

## Functionality

The `hashPassword` function takes a plaintext password as input and returns a hashed password. It utilizes the `bcrypt.genSalt` function to generate a salt with the specified number of rounds (saltRounds). Then, it uses the generated salt to hash the password using the `bcrypt.hash` function. The hashed password is then returned.

## Usage

1. **Install Dependencies**: Install the `bcryptjs` library using npm or yarn:

```bash
npm install bcryptjs
```
