# Node.js Express MongoDB Application

This project is a web application built using Node.js, Express, and MongoDB. It includes user authentication with JWT and features for user registration, login, and applying for referrals. 

## Features

- User registration and login
- JWT-based authentication
- Referral application
- Data storage in MongoDB

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- EJS (Embedded JavaScript templates)

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

## Getting Started

### Installation

1. Clone the repository:

```sh
git clone https://github.com/divspark/Worko-assignment.git
```

2. Navigate to the project directory:

```sh
cd your-repo
```

3. Install dependencies:

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
PORT=4000
MONGODB_URI=your-mongodb-uri
```

### Running the Application

Start the server:

```sh
npm start
```

The server will start on `http://localhost:4000`.

## API Endpoints

### User Routes (`/user`)

- **POST /user/signup**
  - Description: Register a new user
  - Body Parameters:
    - `username` (string)
    - `email` (string)
    - `password` (string)
    - `name` (string)
    - `age` (number)
    - `city` (string)
    - `zipCode` (string)

- **POST /user/login**
  - Description: Login a user
  - Body Parameters:
    - `email` (string)
    - `password` (string)

- **POST /user/:id/update**
  - Description: Update user details
  - Body Parameters (all fields are optional):
    - `username` (string)
    - `email` (string)
    - `name` (string)
    - `age` (number)
    - `city` (string)
    - `zipCode` (string)

### Referral Routes (`/referral`)

- **POST /referral/apply**
  - Description: Apply for a referral
  - Body Parameters:
    - `userId` (string)
    - `referralDetails` (string)

## Authentication

This application uses JWT for authentication. Upon successful login, a JWT token is issued to the user. This token must be included in the `Authorization` header for accessing protected routes.

Example:

```sh
Authorization: Bearer <token>
```

## Folder Structure

```plaintext
.
├── controllers
│   ├── userController.js
│   ├── referralController.js
├── models
│   ├── userModel.js
│   ├── referralModel.js
├── routes
│   ├── userRoutes.js
│   ├── referralRoutes.js
├── services
│   ├── userService.js
│   ├── referralService.js
├── middlewares
│   ├── authMiddleware.js
├── views
│   ├── signup.ejs
│   ├── login.ejs
│   ├── updateProfile.ejs
├── .env
├── app.js
├── package.json
└── README.md
```
