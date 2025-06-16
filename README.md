# WanderNest

## 🚀 Project Overview

**WanderNest** is a robust hotel booking system built with the **MERN stack**, offering a seamless experience for travelers and hotel owners. Users can explore and book hotel rooms with dynamic search, filters, and personalized recommendations. Hotel owners benefit from powerful tools to manage properties, track bookings, and monitor revenue. With **Clerk** authentication, **Stripe payment integration**, and responsive design, WanderNest provides a secure, modern solution for all hospitality needs.

---

## 🌐 Live URL & Repository

- **Live Application**: [http://localhost:5173](http://localhost:5173)
- **GitHub Repository**: [https://github.com/AishwaryaS9/HotelBooking.git](https://github.com/AishwaryaS9/HotelBooking.git)

---

## 🛠️ Tech Stack

### Core Technologies:

- **Frontend**: React.js, TypeScript, Vite

- **Backend**: Node.js with Express.js for server-side logic and APIs

- **State Management**: Context API

- **Styling**: Tailwind CSS, prebuiltui for reusable UI components

- **Icons**: react-icons

- **API Integration**: [Hotel Booking Backend](https://hotel-booking-backend-fawn.vercel.app/)

- **Database**: MongoDB for a flexible and scalable NoSQL database

- **Authentication**: Clerk for secure and user-friendly authentication

- **Image Uploads**: Cloudinary for storing and serving media files

- **File Uploads**: Multer for server-side file uploads

- **Email Service:** Nodemailer for sending emails

- **Payment**: Stripe payment integration

---

## ✨ Features

### Login Features

Authentication is implemented using **Clerk**, a modern authentication and user management platform. Clerk simplifies authentication by providing prebuilt UI components and secure session handling.

#### Key Authentication Features

- **User Registration**:

  - Easy registration with email and password or social login providers.

- **Social Login Integration**:

  - Supports Google Sign in.

- **Session Management**:

  - Automatically manages user sessions securely.

- **Prebuilt UI**:

  - Clerk's prebuilt sign-in and sign-up forms are styled and ready to use, reducing development overhead.

- **Role Assignment**:
  - Upon registration, users can be assigned roles (`user` or `hotelOwner`) to manage access control.

#### How It Works

- **Integration**:

   - The project uses Clerk's React components to handle the sign-in, sign-up, and authentication flow.
   - Clerk's API and hooks provide user session and role details.

- **Role-Based Access**:

   - The backend verifies roles (via Clerk’s user data) to enforce access permissions (e.g., only "hotelOwner" users can manage hotels).

- **Session Validation**:
   - Clerk ensures all requests to protected endpoints include valid tokens for authentication.

### User Features

- **Dynamic Search:**

  - Users can search for hotels by entering a destination, selecting check-in and check-out dates, and specifying the number of guests.

- **Recent Searches:**

  - The website stores the user's recent search destinations and ensures only the last three searches are retained for quick access.

- **Featured Destinations:**

  - Explore a selection of meticulously chosen hotels that combine elegance, comfort, and unforgettable experiences, showcased prominently on the home page.
  - Discover high-quality accommodations through visually appealing displays and key details tailored to inspire your next adventure.

- **Integrated Navigation:**

  - Effortlessly navigate to search results, displaying available rooms matching the user's preferences.

- **Responsive Design:**

  - The search form is optimized for both desktop and mobile views, ensuring usability across devices.

- **Autocomplete Suggestions:**

  - Destination input provides autocomplete suggestions using a list of popular cities.

### Hotel Owner Features

Manage hotel listings, rooms, and availability while accessing a dashboard to track bookings and revenue seamlessly.

- **Dashboard**

  The **Dashboard** offers hotel owners a detailed overview of their operations, presenting essential metrics such as total bookings and cumulative revenue in the chosen currency. It includes a list of recent bookings, highlighting user names, room details, total amounts, and payment statuses (e.g., Paid or Unpaid), enabling effective tracking and management of hotel performance.

- **Add Room**

  The **Add Room** enables hotel owners to create and showcase room listings with ease. Users can upload images, select room types, set prices, and highlight amenities, all through an intuitive interface. Live image previews ensure the process is streamlined and listings are visually appealing.

- **List Room**

  The **List Room** helps hotel owners manage room listings efficiently by displaying details like type, amenities, and pricing in a simple table. Owners can toggle availability with ease, keeping room statuses updated for guests. It also provides prompts when no rooms are listed, ensuring smooth management.

### Hotel Rooms

- **Comprehensive Search and Filters:**

  - Users can explore available hotel rooms with dynamic filters for room type, price range, and destination.
  - Sort options such as "Price Low to High," "Price High to Low," and "Newest First" enhance usability.

- **Room Listings:**

  - Each room listing includes essential details such as price, location, reviews, amenities, and high-quality images.
  - Users can make informed booking decisions with all the necessary information at their fingertips.

- **Room Details:**

  - **Detailed Room Overview:** Displays comprehensive details, including the hotel's name, room type, price per night, address, amenities, reviews, and images, along with available discounts to help users evaluate their options.

  - **Interactive Booking Features:** Allows users to input check-in and check-out dates, select the number of guests, check room availability, and access additional specifications. Upon successful booking, a confirmation email is promptly sent to the user for their records.

### My Bookings

The **My Bookings** enables users to manage their hotel reservations by displaying details such as hotel name, room type, location, guest count, and check-in/check-out timings. It highlights payment statuses (Paid or Unpaid) and facilitates payment completion for pending bookings, offering a streamlined experience for tracking and managing past, current, and upcoming bookings.

### Payment

The platform integrates **Stripe** for secure and seamless payment processing, automatically updating booking statuses to "Paid" and "Confirmed" upon successful transactions. This ensures a smooth and reliable payment experience while maintaining high standards of security and compliance.

---

## 📂 Project Structure

```
HotelBooking/
├── .gitignore
├── client/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.svg
│   ├── README.md
│   ├── src/
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   ├── assets.ts
│   │   ├── components/
│   │   │   ├── ExclusiveOffers.tsx
│   │   │   ├── FeaturedDestination.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HotelCard.tsx
│   │   │   ├── hotelOwner/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   ├── HotelRegister.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NewsLetter.tsx
│   │   │   ├── RecommendedHotels.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   ├── Title.tsx
│   │   ├── context/
│   │   │   ├── AppContext.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── AllRooms.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── hotelOwner/
│   │   │   │   ├── AddRoom.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── ListRoom.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   ├── RoomDetails.tsx
│   │   ├── utils/
│   │   │   ├── interface.ts
│   │   ├── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   ├── vite.config.ts
├── README.md
├── server/
│   ├── .env
│   ├── .gitignore
│   ├── configs/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── nodemailer.js
│   ├── controllers/
│   │   ├── bookingController.js
│   │   ├── clerkWebhooks.js
│   │   ├── hotelController.js
│   │   ├── roomController.js
│   │   ├── stripeWebhooks.js
│   │   ├── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Hotel.js
│   │   ├── Room.js
│   │   ├── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── bookingRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── roomRoutes.js
│   │   ├── userRoutes.js
│   ├── server.js
│   ├── vercel.json

```

---

## 🔧 Installation

### Prerequisites

- **Node.js**: Install from [Node.js official website](https://nodejs.org).
- **MongoDB**: Set up a MongoDB instance locally or use a cloud database like MongoDB Atlas.

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/AishwaryaS9/HotelBooking.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd HotelBooking
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up environment variables:
    Create a .env file in the root directory and add the following:

    - **client:**

    ```bash
        VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        VITE_BACKEND_URL=https://hotel-booking-backend-fawn.vercel.app
        VITE_CURRENCY= $
    ```

    - **server**:

    ```bash
        MONGO_URI=your_mongo_uri
        PORT=your_port
        JWT_SECRET=your_jwt_secret
        CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        CLERK_SECRET_KEY=your_clerk_secret_key
        CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        SENDER_EMAIL=your_sender_email
        SMTP_USER=your_smtp_user
        SMTP_PASS=your_smtp_password
        CURRENCY=your_currency
        STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
        STRIPE_SECRET_KEY=your_stripe_secret_key
        STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    ```

5.  Run the Backend:

    Navigate to the backend directory and start the server:

    ```bash
    cd server
    nodemon
    ```

    The backend will run on http://localhost:3000 (or the port specified in your .env file).

6.  Run the Frontend:

    Open a new terminal, navigate to the frontend directory, and start the development server:

    ```bash
    cd client
    npm run dev
    ```

    The frontend will run on http://localhost:5173.

7.  Access the Application

    Open your browser and visit http://localhost:5173 to view the application.

---

## 🎯 Conclusion

WanderNest is a modern, feature-packed hotel booking platform built with the MERN stack. It streamlines travel and hotel management with dynamic search, secure Clerk authentication, Stripe integration, and responsive design. Whether you're planning your next trip or managing hospitality operations, WanderNest offers a simple and powerful solution. Follow the setup guide to explore its full potential!
