# Finance Tracker App

## Overview

The Finance Tracker App is a comprehensive solution designed to help users
monitor and manage their financial activities efficiently. It splits into two
core components: the backend, built with Node.js, TypeScript, and Express.js,
and the frontend, developed using Next.js, TypeScript, and TailwindCSS. This
setup ensures a robust, scalable application capable of handling various
financial tracking functionalities.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (Download and install from [Node.js website](https://nodejs.org/))
-   npm (Comes installed with Node.js)

### Setting Up the Project

First, clone the repository to your local machine using Git:

```bash
git clone git@github.com:Maghakishiyev/41937-57690-56862-56366-56940-personal-finance-tracker-app.git
cd finance-tracker-app
```

## Backend Setup

The backend of the Finance Tracker App is designed to handle data management,
authentication, and API requests.

### Installation

Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Before starting the backend you will need to create `.env` file in
`root/backend` directory for environmental variables. This file must contain
following values:

```docker
PORT=8080
MONGO_URI = "mongodb uri"
JWT_SECRET = "secret for jwt"
AWS_ACCESS_KEY = "AWS Access key"
AWS_SECRET_KEY = "AWS Secret key"
BUCKET_NAME ="lab-automatization"
BUCKET_REGION ="us-east-1"
```

Running the Backend Server To start the backend server in development mode, use
the following command:

```bash
npm run dev
```

The server start on http://localhost:8080.

## Frontend Setup

The frontend of the app provides the user interface, built with responsiveness
and user experience in mind.

### Installation

Navigate to the frontend directory from the root of the project and install the
necessary dependencies:

```bash
cd frontend
npm install
```

Before starting the frontend you will need to create `.env` file in
`root/frontend` directory for environmental variables. This file must contain
following values:

```docker
NEXT_PUBLIC_BACKEND_URL='http://localhost:8080/api'
```

Running the Frontend To launch the frontend in development mode, run:

```bash
npm run dev
```

This will start the frontend accessible at http://localhost:3000.

## Features

-   User Authentication: Securely manage access with login and registration
    features.
-   Dashboard: Get an overview of your financial status with insights into
    expenses, income, and savings.
-   Expense Tracking: Add, edit, and delete expense records to keep your
    finances in check.
-   Category management
-   User Account management
-   Income/Expense account management
-   User statistics

## License

Distributed under the MIT License. See LICENSE for more information.
