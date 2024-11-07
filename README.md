
# E-commerce Website with Cash on Delivery Service

An e-commerce website built with React, Express, and MongoDB that enables users to browse, search, and order products, focusing on a cash-on-delivery payment model. This website offers secure user authentication with JWT and includes an admin dashboard for order management.


## Live Demo
Visit the website: https://e-comweb-7how.vercel.app/users/acceuil

## Features

- **Product Presentation and Search**: Users can browse available products and search by letter or keyword to find specific items.
- **Shopping Cart Management**: Add or remove quantities before placing an order.
- **Order Placement**: Complete a form to confirm the order, saving the client's details and selected products in the database.
- **Cash on Delivery (COD)**: The primary payment method is cash on delivery.
- **User Authentication**: Secure user authentication with hashed passwords and JWT-based login system.
- **Admin Access**: Admin users can log in to view orders, check the status of products, and mark items as sold or pending.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT for token-based authentication, with bcrypt for password hashing

## Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js**: To run server and build scripts
- **MongoDB**: A MongoDB database to store data

### Steps to Install

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/walided88/e-comweb.git
   cd labo
   ```

2. **Backend Setup**:

   - Navigate to the backend folder:
     ```bash
     cd server
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Configure environment variables:
     - Create a `.env` file in the backend directory with the following variables:
       ```
       MONGODB_URI=your_mongodb_connection_string
       JWT_SECRET=your_secret_key
       ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:

   - Navigate to the frontend folder:
     ```bash
     cd labo
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

### Accessing the Application

- The frontend will run on `http://localhost:3000`.
- The backend will run on `http://localhost:5000` or the port specified in your backend configuration.

## Key Functionalities

1. **User Account and Login**:
   - Users can create an account and log in securely with JWT-based authentication.
   - Passwords are encrypted using bcrypt to ensure secure storage.

2. **Browsing and Searching Products**:
   - Users can browse a product catalog and search for items by typing letters or keywords.

3. **Shopping Cart**:
   - Users can add items to the cart, adjust quantities, and view the total cost before proceeding to checkout.

4. **Order Form and Data Persistence**:
   - On placing an order, users fill out a form with personal details, which, along with the cart items, is stored in MongoDB.
   - Orders are marked for cash-on-delivery payment.

5. **Admin Dashboard**:
   - Admin users can access a dashboard to view all customer orders.
   - Admins can update the status of each product, marking items as "Sold" or "Pending."

## Security Features

- **JWT Authentication**: JSON Web Tokens are used to manage secure user sessions.
- **Password Hashing**: Passwords are hashed with bcrypt for secure storage in the database.

## License

This project is licensed under the MIT License.
