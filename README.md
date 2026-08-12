# 🏍️ Bike Service Management Platform

A full-stack web application for managing bike servicing and maintenance bookings.

The platform allows customers to book bike services online and provides an admin dashboard to manage, update, search, and monitor service bookings.
##  Features

###  Customer Side

- Online bike service booking
- Customer information submission
- Bike model selection
- Service selection
- Date and time selection
- Pickup service option
- Additional service notes
- Booking confirmation

###  Admin Dashboard

- View all service bookings
- Total booking statistics
- Pending booking count
- Confirmed booking count
- Completed booking count
- Search bookings by customer name, phone number, or bike model
- Filter bookings by status
- Filter bookings by service type
- Update booking status
- Delete bookings
- Refresh booking data
- Responsive dashboard interface
- ##  Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Development Tools
- Visual Studio Code
- MongoDB Compass
- Postman
- Git & GitHub
- ##  Project Structure

```text
Bike-Service-Management-Platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md

##  Application Workflow

```text
Customer
   ↓
Booking Form
   ↓
React Frontend
   ↓
REST API
   ↓
Node.js + Express
   ↓
MongoDB
   ↓
Admin Dashboard
   ↓
Booking Management

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/srishti0503/bike-service-management-platform.git
cd bike-service-management-platform

2. Frontend Setup

Open a terminal and run:

cd frontend
npm install
npm run dev

The frontend will start on the Vite development server.

3. Backend Setup

Open another terminal and run:

cd backend
npm install
node server.js

The backend server runs on:

http://localhost:5000
4. Database

Make sure MongoDB is installed and running before starting the backend.

The application uses MongoDB to store customer service bookings.

## 🔌 API Endpoints

### Create Booking

```http
POST /api/bookings
Get All Bookings
GET /api/bookings

Fetches all customer bookings.

Update Booking Status
PUT /api/bookings/:id

Updates the status of a booking.

Delete Booking
DELETE /api/bookings/:id

Deletes a booking from the system.

 Booking Status

The admin can manage bookings using the following statuses:

Pending
Confirmed
In Service
Completed
Cancelled

##  Future Scope

The project can be further enhanced with:

- Customer authentication
- Admin authentication
- Email notifications
- SMS notifications
- Online payment integration
- Service history
- Invoice generation
- Customer feedback and ratings
- Real-time booking notifications
- Advanced analytics
- Cloud deployment

---

##  Developer

**Srishti Yadav**

B.tech Computer Science & Engineering

---

##  Project Highlights

- Full-stack web application
- React-based frontend
- Node.js and Express backend
- MongoDB database integration
- REST API architecture
- Admin dashboard
- Online service booking
- Search and filtering functionality
- Booking status management
- Responsive user interface

---

## 📄 License

This project is developed for educational and portfolio purposes.
