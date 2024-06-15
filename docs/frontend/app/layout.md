# RootLayout Component Documentation

## Overview

This document describes the implementation of the `RootLayout` component in your Next.js application.

## Imports

### External Libraries

The component imports the following external libraries:

- `next`: Imports types for `Metadata` and `Inter` font.
- `react`: Imports the React library for building user interfaces.

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

Inter Font Configuration
The Inter font is configured with Latin subsets and applied to the body element.

Metadata
Defines metadata for the Next.js page:

RootLayout Component
Description
The RootLayout component provides a base layout for your Next.js application. It includes a header and renders its children components.

Props
children: React nodes representing the content to be rendered within the layout.

HTML Structure
Sets the document language to English ('en').
Applies the inter font class to the body element.
Includes the Header component at the top of the body.
Renders the children components within the layout.