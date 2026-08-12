const bookingRoutes = require("./routes/bookingRoutes")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅")
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌", error)
  })

  // Booking Routes
app.use("/api/bookings", bookingRoutes)

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Bike Service Management Platform API is running 🚀",
  })
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})