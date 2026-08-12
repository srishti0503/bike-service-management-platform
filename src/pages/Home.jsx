import { useState } from "react"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Footer from "../components/Footer"
import BookingModal from "../components/BookingModal"

function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <Navbar
  onBookService={() => setIsBookingOpen(true)}
/>

      <main>
        <Hero
          onBookService={() => setIsBookingOpen(true)}
        />

        <Services />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  )
}

export default Home