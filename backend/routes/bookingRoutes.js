const express = require("express")
const Booking = require("../models/Booking")

const router = express.Router()


// ========================================
// CREATE A NEW BOOKING
// ========================================

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body)

    const savedBooking = await booking.save()

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    })

  } catch (error) {

    console.error("Booking Error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    })
  }
})


// ========================================
// GET ALL BOOKINGS
// ========================================

router.get("/", async (req, res) => {
  try {

    const bookings = await Booking.find().sort({
      createdAt: -1,
    })

    res.status(200).json({
      success: true,
      bookings,
    })

  } catch (error) {

    console.error("Fetch Bookings Error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    })
  }
})


// ========================================
// UPDATE BOOKING
// ========================================

router.put("/:id", async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      bikeModel,
      service,
      date,
      time,
      pickup,
      notes,
      status,
    } = req.body


    const updatedBooking =
      await Booking.findByIdAndUpdate(
        req.params.id,

        {
          name,
          email,
          phone,
          bikeModel,
          service,
          date,
          time,
          pickup,
          notes,
          status,
        },

        {
          new: true,
          runValidators: true,
        }
      )


    if (!updatedBooking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })

    }


    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    })


  } catch (error) {

    console.error("Update Booking Error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    })
  }
})


// ========================================
// DELETE BOOKING
// ========================================

router.delete("/:id", async (req, res) => {
  try {

    const deletedBooking =
      await Booking.findByIdAndDelete(
        req.params.id
      )


    if (!deletedBooking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })

    }


    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    })


  } catch (error) {

    console.error("Delete Booking Error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    })
  }
})


module.exports = router