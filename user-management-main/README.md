
# User Management REST API

A simple REST API demonstration for managing users with complete CRUD functionality.

## Project Overview

This project demonstrates a basic REST API implementation with a clean and responsive UI. It provides endpoints for creating, reading, updating, and deleting user records with client-side data management.

## Features

- **Complete CRUD Operations**: Create, read, update, and delete user records
- **In-memory Data Storage**: Simulates a database using client-side storage
- **Interactive Documentation**: Explore API endpoints with example requests and responses
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Error Handling**: Proper error handling with user-friendly messages

## Technologies Used

- TypeScript
- React
- Tailwind CSS
- shadcn/ui (UI component library)
- React Query for data fetching
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd user-management-api

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Documentation

The API provides the following endpoints:

### Users Endpoint

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | /api/users   | Retrieve all users        |
| GET    | /api/users/:id | Retrieve a specific user |
| POST   | /api/users   | Create a new user         |
| PUT    | /api/users/:id | Update an existing user  |
| DELETE | /api/users/:id | Delete a user            |

## License

This project is open source and available under the [MIT License](LICENSE).
