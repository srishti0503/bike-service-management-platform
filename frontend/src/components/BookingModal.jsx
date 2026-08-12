import { useState } from "react"

function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bikeModel: "",
    service: "",
    date: "",
    time: "",
    pickup: "No",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(
      "http://localhost:5000/api/bookings",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    )

    const data = await response.json()

    if (data.success) {
      alert("Booking confirmed successfully! 🎉")

      onClose()

      setFormData({
        name: "",
        email: "",
        phone: "",
        bikeModel: "",
        service: "",
        date: "",
        time: "",
        pickup: "No",
        notes: "",
      })
    } else {
      alert("Booking failed. Please try again.")
    }
  } catch (error) {
    console.error("Booking Error:", error)

    alert(
      "Unable to connect to server. Please try again later."
    )
  }
}
  

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        {/* Modal Header */}
        <div className="modal-header">

          <div>
            <span className="modal-label">
              BOOK YOUR SERVICE
            </span>

            <h2>
              Schedule Your Bike Service
            </h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* Booking Form */}
        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>


          {/* Phone */}
          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              required
            />

          </div>


          {/* Bike Model */}
          <div className="form-group">

            <label>
              Bike Brand / Model
            </label>

            <input
              type="text"
              name="bikeModel"
              value={formData.bikeModel}
              onChange={handleChange}
              placeholder="Example: Royal Enfield Classic 350"
              required
            />

          </div>


          {/* Service */}
          <div className="form-group">

            <label>
              Select Service
            </label>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >

              <option value="">
                Choose a service
              </option>

              <option value="General Service">
                General Service
              </option>

              <option value="Engine Repair">
                Engine Repair
              </option>

              <option value="Oil Change">
                Oil Change
              </option>

              <option value="Brake & Tyres">
                Brake & Tyres
              </option>

              <option value="Battery Service">
                Battery Service
              </option>

              <option value="Washing & Detailing">
                Washing & Detailing
              </option>

            </select>

          </div>


          {/* Date & Time */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Preferred Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Preferred Time
              </label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Time
                </option>

                <option value="09:00 AM">
                  09:00 AM
                </option>

                <option value="11:00 AM">
                  11:00 AM
                </option>

                <option value="01:00 PM">
                  01:00 PM
                </option>

                <option value="03:00 PM">
                  03:00 PM
                </option>

                <option value="05:00 PM">
                  05:00 PM
                </option>

              </select>

            </div>

          </div>


          {/* Pickup */}
          <div className="form-group">

            <label>
              Do you need doorstep pickup?
            </label>

            <div className="radio-group">

              <label className="radio-option">

                <input
                  type="radio"
                  name="pickup"
                  value="Yes"
                  checked={formData.pickup === "Yes"}
                  onChange={handleChange}
                />

                Yes, pickup required

              </label>


              <label className="radio-option">

                <input
                  type="radio"
                  name="pickup"
                  value="No"
                  checked={formData.pickup === "No"}
                  onChange={handleChange}
                />

                No, I will bring my bike

              </label>

            </div>

          </div>


          {/* Notes */}
          <div className="form-group">

            <label>
              Additional Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us if your bike has any specific issue..."
              rows="3"
            />

          </div>


          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              Confirm Booking →
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default BookingModal