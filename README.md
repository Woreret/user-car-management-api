# REST API for User and Car Management

## Description
A RESTful API built with Node.js and Express.js that handles secure user authentication, profile management, and related data entities (cars). It uses PostgreSQL as a relational database and implements JSON Web Tokens (JWT) for secure, stateless authentication. Passwords are cryptographically hashed using bcrypt. OpenAPI 3.0 documentation is integrated via Swagger UI.

## Technologies Used
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Security: bcrypt (password hashing)
- Environment Management: dotenv
- API Documentation: Swagger UI (swagger-ui-express, swagger-jsdoc)

## Features
- User Authentication: Secure registration and login endpoints.
- Authorization: JWT-based middleware to protect private routes.
- Profile Management: Authenticated users can update their profile information or delete their account.
- Entity Management: Authenticated users can add, list, update, and delete vehicles in their garage.
- Relational Integrity: Implements cascading deletes (deleting a user automatically removes their associated vehicles from the database).
- API Documentation: Interactive Swagger UI endpoint available at `/api-docs`.

## Prerequisites
- Node.js (v14 or higher recommended)
- PostgreSQL installed and running

## Database Setup
Execute the following SQL commands in your PostgreSQL environment to create the required tables:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

## Installation
1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory and add the following variables:
```env
PORT=4000
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

## Running the Application
To start the server in development mode (if using nodemon):
```bash
npm run dev
```

To start the server in production mode:
```bash
npm start
```

## API Documentation
Interactive OpenAPI 3.0 documentation is available when running the application at:
```
http://localhost:4000/api-docs
```

## API Endpoints

### Public Routes
- `POST /api/v1/users/register` - Register a new user. Requires `name`, `email`, `role`, and `password`.
- `POST /api/v1/users/login` - Authenticate user and receive a JWT. Requires `email` and `password`.

### Protected Routes (Requires Bearer Token)
- `PUT /api/v1/users/updateUserName` - Update the authenticated user's name. Requires `newName`.
- `DELETE /api/v1/users/deleteUser` - Delete the authenticated user's account and associated data.
- `POST /api/v1/users/addCar` - Add a vehicle to the authenticated user's garage. Requires `brand`, `model`, and `year`.
- `GET /api/v1/users/my` - Retrieve all vehicles belonging to the authenticated user.
- `PUT /api/v1/users/updateCar/:id` - Update a vehicle by ID. Requires `brand`, `model`, and `year`.
- `DELETE /api/v1/users/deleteCar/:id` - Delete a vehicle by ID.
