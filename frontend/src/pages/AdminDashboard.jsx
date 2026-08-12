import { useEffect, useState } from "react"
import "./AdminDashboard.css"

function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")

  const [selectedBooking, setSelectedBooking] = useState(null)

  // Edit booking
  const [editingBooking, setEditingBooking] = useState(null)
  const [editForm, setEditForm] = useState({})


  // ========================================
  // FETCH BOOKINGS
  // ========================================

 const fetchBookings = async () => {
  try {
    setLoading(true)

    const response = await fetch(
      "http://localhost:5000/api/bookings"
    )

    if (!response.ok) {
      throw new Error("Failed to fetch bookings")
    }

    const data = await response.json()

    if (data.success) {
      setBookings(data.bookings)
    } else {
      console.error("Failed to load bookings")
    }

  } catch (error) {
    console.error("Error fetching bookings:", error)

  } finally {
    setLoading(false)
  }
}

  // ========================================
  // UPDATE STATUS
  // ========================================

  const updateStatus = async (id, status) => {
    try {

      const booking = bookings.find(
        (item) => item._id === id
      )

      if (!booking) return

      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...booking,
            status,
          }),
        }
      )

      const data = await response.json()

      if (data.success) {
        fetchBookings()
      }

    } catch (error) {
      console.error(
        "Error updating booking status:",
        error
      )
    }
  }


  // ========================================
  // DELETE BOOKING
  // ========================================

  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    )

    if (!confirmDelete) return

    try {

      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (data.success) {
        fetchBookings()
      }

    } catch (error) {
      console.error(
        "Error deleting booking:",
        error
      )
    }
  }


  // ========================================
  // OPEN EDIT MODAL
  // ========================================

  const openEditModal = (booking) => {

    setEditingBooking(booking)

    setEditForm({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      bikeModel: booking.bikeModel || "",
      service: booking.service || "",
      date: booking.date || "",
      time: booking.time || "",
      pickup: booking.pickup || "No",
      notes: booking.notes || "",
      status: booking.status || "Pending",
    })
  }


  // ========================================
  // HANDLE EDIT FORM
  // ========================================

  const handleEditChange = (e) => {

    const { name, value } = e.target

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  // ========================================
  // SAVE EDITED BOOKING
  // ========================================

  const saveEditedBooking = async (e) => {

    e.preventDefault()

    if (!editingBooking) return

    try {

      const response = await fetch(
        `http://localhost:5000/api/bookings/${editingBooking._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(editForm),
        }
      )

      const data = await response.json()

      if (data.success) {

        alert("Booking updated successfully! ✅")

        setEditingBooking(null)

        setEditForm({})

        fetchBookings()

      } else {

        alert(
          data.message ||
          "Failed to update booking."
        )
      }

    } catch (error) {

      console.error(
        "Edit Booking Error:",
        error
      )

      alert(
        "Unable to connect to server."
      )
    }
  }


  // ========================================
  // SEARCH & FILTER
  // ========================================

  const filteredBookings = bookings.filter(
    (booking) => {

      const search =
        searchTerm.toLowerCase()

      const matchesSearch =
        booking.name
          ?.toLowerCase()
          .includes(search) ||

        booking.phone
          ?.includes(search) ||

        booking.bikeModel
          ?.toLowerCase()
          .includes(search)


      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter


      const matchesService =
        serviceFilter === "All" ||
        booking.service === serviceFilter


      return (
        matchesSearch &&
        matchesStatus &&
        matchesService
      )
    }
  )


  // ========================================
  // STATISTICS
  // ========================================

  const totalBookings =
    bookings.length

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Pending"
    ).length

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Confirmed"
    ).length

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length


  return (
    <div className="admin-dashboard">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-label">
            ADMIN PANEL
          </span>

          <h1>
            Bike Service Dashboard
          </h1>

          <p>
            Manage customer bookings and
            service requests.
          </p>

        </div>


        <button
          className="refresh-btn"
          onClick={fetchBookings}
          type="button"
        >
          ↻ Refresh
        </button>

      </div>


      {/* ========================================
          STATISTICS
      ======================================== */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Bookings</span>
          <strong>{totalBookings}</strong>
        </div>


        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingBookings}</strong>
        </div>


        <div className="stat-card">
          <span>Confirmed</span>
          <strong>{confirmedBookings}</strong>
        </div>


        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedBookings}</strong>
        </div>

      </div>


      {/* ========================================
          BOOKINGS SECTION
      ======================================== */}

      <div className="bookings-section">


        <div className="section-header">

          <h2>
            Service Bookings
          </h2>

          <span>
            {filteredBookings.length} bookings
          </span>

        </div>


        {/* SEARCH & FILTERS */}

        <div className="booking-filters">


          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search customer, phone or bike..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="In Service">
              In Service
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>


          <select
            value={serviceFilter}
            onChange={(e) =>
              setServiceFilter(e.target.value)
            }
          >

            <option value="All">
              All Services
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


        {/* ========================================
            BOOKING TABLE
        ======================================== */}

        {loading ? (

          <p className="loading">
            Loading bookings...
          </p>

        ) : bookings.length === 0 ? (

          <div className="empty-state">

            <h3>
              No bookings yet
            </h3>

            <p>
              Customer bookings will appear here.
            </p>

          </div>

        ) : filteredBookings.length === 0 ? (

          <div className="empty-state">

            <h3>
              No matching bookings
            </h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Bike</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Pickup</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {filteredBookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                    >

                      <td>

                        <strong>
                          {booking.name}
                        </strong>

                        <small>
                          {booking.phone}
                        </small>

                      </td>


                      <td>
                        {booking.bikeModel}
                      </td>


                      <td>
                        {booking.service}
                      </td>


                      <td>
                        {booking.date}
                      </td>


                      <td>
                        {booking.time}
                      </td>


                      <td>
                        {booking.pickup}
                      </td>


                      {/* STATUS */}

                      <td>

                        <select
                          className={`status-select status-${(
                            booking.status ||
                            "Pending"
                          )
                            .toLowerCase()
                            .replace(" ", "-")}`}

                          value={
                            booking.status ||
                            "Pending"
                          }

                          onChange={(e) =>
                            updateStatus(
                              booking._id,
                              e.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="In Service">
                            In Service
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">


                          {/* VIEW */}

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedBooking(
                                booking
                              )
                            }
                          >
                            👁 View
                          </button>


                          {/* EDIT */}

                          <button
                            className="edit-btn"
                            onClick={() =>
                              openEditModal(
                                booking
                              )
                            }
                          >
                            ✏️ Edit
                          </button>


                          {/* DELETE */}

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteBooking(
                                booking._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ========================================
          VIEW BOOKING MODAL
      ======================================== */}

      {selectedBooking && (

        <div
          className="booking-modal-overlay"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="booking-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="details-modal-header">

              <div>

                <span className="modal-label">
                  BOOKING DETAILS
                </span>

                <h2>
                  {selectedBooking.name}
                </h2>

              </div>


              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                ×
              </button>

            </div>


            <div className="details-section">

              <h3>
                Customer Information
              </h3>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Full Name</span>
                  <strong>
                    {selectedBooking.name}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Phone</span>
                  <strong>
                    {selectedBooking.phone}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Email</span>
                  <strong>
                    {selectedBooking.email}
                  </strong>
                </div>

              </div>

            </div>


            <div className="details-section">

              <h3>
                Bike & Service
              </h3>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Bike Model</span>
                  <strong>
                    {selectedBooking.bikeModel}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Service</span>
                  <strong>
                    {selectedBooking.service}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Pickup</span>
                  <strong>
                    {selectedBooking.pickup}
                  </strong>
                </div>

              </div>

            </div>


            <div className="details-section">

              <h3>
                Appointment
              </h3>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Date</span>
                  <strong>
                    {selectedBooking.date}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Time</span>
                  <strong>
                    {selectedBooking.time}
                  </strong>
                </div>


                <div className="detail-item">
                  <span>Status</span>
                  <strong>
                    {selectedBooking.status ||
                      "Pending"}
                  </strong>
                </div>

              </div>

            </div>


            <div className="details-section">

              <h3>
                Additional Notes
              </h3>

              <div className="notes-box">

                {selectedBooking.notes ||
                  "No additional notes provided."}

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="modal-done-btn"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ========================================
          EDIT BOOKING MODAL
      ======================================== */}

      {editingBooking && (

        <div
          className="booking-modal-overlay"
          onClick={() =>
            setEditingBooking(null)
          }
        >

          <div
            className="booking-details-modal edit-booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Header */}

            <div className="details-modal-header">

              <div>

                <span className="modal-label">
                  EDIT BOOKING
                </span>

                <h2>
                  Update Booking
                </h2>

              </div>


              <button
                className="modal-close-btn"
                onClick={() =>
                  setEditingBooking(null)
                }
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={saveEditedBooking}
              className="edit-booking-form"
            >


              {/* Name */}

              <div className="edit-form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />

              </div>


              {/* Email */}

              <div className="edit-form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />

              </div>


              {/* Phone */}

              <div className="edit-form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  pattern="[0-9]{10}"
                  required
                />

              </div>


              {/* Bike */}

              <div className="edit-form-group">

                <label>
                  Bike Brand / Model
                </label>

                <input
                  type="text"
                  name="bikeModel"
                  value={editForm.bikeModel}
                  onChange={handleEditChange}
                  required
                />

              </div>


              {/* Service */}

              <div className="edit-form-group">

                <label>
                  Service
                </label>

                <select
                  name="service"
                  value={editForm.service}
                  onChange={handleEditChange}
                  required
                >

                  <option value="">
                    Choose Service
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


              {/* Date */}

              <div className="edit-form-group">

                <label>
                  Preferred Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  required
                />

              </div>


              {/* Time */}

              <div className="edit-form-group">

                <label>
                  Preferred Time
                </label>

                <select
                  name="time"
                  value={editForm.time}
                  onChange={handleEditChange}
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


              {/* Pickup */}

              <div className="edit-form-group">

                <label>
                  Doorstep Pickup
                </label>

                <select
                  name="pickup"
                  value={editForm.pickup}
                  onChange={handleEditChange}
                >

                  <option value="Yes">
                    Yes, pickup required
                  </option>

                  <option value="No">
                    No, customer will bring bike
                  </option>

                </select>

              </div>


              {/* Status */}

              <div className="edit-form-group">

                <label>
                  Booking Status
                </label>

                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="In Service">
                    In Service
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>


              {/* Notes */}

              <div className="edit-form-group">

                <label>
                  Additional Notes
                </label>

                <textarea
                  name="notes"
                  value={editForm.notes}
                  onChange={handleEditChange}
                  rows="4"
                  placeholder="Enter additional notes..."
                />

              </div>


              {/* BUTTONS */}

              <div className="edit-form-actions">

                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={() =>
                    setEditingBooking(null)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-edit-btn"
                >
                  💾 Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminDashboard