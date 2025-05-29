# Phone Store Backend API

## Description
This project is a backend API for a phone store application, built with Node.js, Express, and MongoDB. It provides functionalities for user authentication, product management, category management, order processing, and integrates with Cloudinary for image uploads and ZaloPay for payment processing.

## Features
- User Authentication (Register, Login)
- User Management (CRUD operations)
- Product Management (CRUD operations, image upload)
- Category Management (CRUD operations)
- Order Management
- Real-time Notifications (via Socket.IO and FCM)
- ZaloPay Integration for payments
- Image Uploads via Cloudinary
- RESTful API design

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- ZaloPay for payment gateway
- Firebase Cloud Messaging (FCM) for push notifications
- Socket.IO for real-time notifications
- Docker for containerization

## Installation

### Prerequisites
- Node.js (LTS version recommended)
- MongoDB
- Docker (optional, for containerized setup)

### Clone the repository
```bash
git clone https://github.com/your-username/project-store-phone-be.git
cd project-store-phone-be
```

### Install dependencies
```bash
npm install
```

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ZALOPAY_APP_ID=your_zalopay_app_id
ZALOPAY_KEY1=your_zalopay_key1
ZALOPAY_KEY2=your_zalopay_key2
ZALOPAY_CALLBACK_URL=your_zalopay_callback_url
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json # Path to your Firebase service account key file
```

**Note on Firebase Service Account Key:**
To enable Firebase Cloud Messaging (FCM), you need to obtain a service account key file from your Firebase project.
1. Go to your Firebase project in the Firebase console.
2. Navigate to Project settings -> Service accounts.
3. Click on "Generate new private key" and download the JSON file.
4. Rename the downloaded file to `serviceAccountKey.json` and place it in the root directory of this project.
5. Ensure the `FIREBASE_SERVICE_ACCOUNT_PATH` in your `.env` file points to this file.

## Running the Application

### Locally
```bash
npm start
```
The API will be running on `http://localhost:5000` (or your specified PORT).

### With Docker
Build the Docker image:
```bash
docker-compose build
```

Run the Docker containers:
```bash
docker-compose up
```
The API will be running on `http://localhost:5000` (or your specified PORT).

## API Endpoints
(To be detailed later, or refer to API documentation tools like Postman/Swagger)

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.