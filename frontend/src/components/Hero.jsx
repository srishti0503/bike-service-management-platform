import bikeHero from "../assets/bike-hero.png"
function Hero({ onBookService }) {
  return (
    <section id="home" className="hero">

      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <span className="hero-tag">
            PREMIUM BIKE CARE
          </span>

          <h1>
            KEEP YOUR RIDE
            <span>RUNNING AT ITS BEST.</span>
          </h1>

          <p>
            Professional bike servicing, expert mechanics,
            transparent pricing, and doorstep pickup —
            everything your bike needs in one platform.
          </p>

          <div className="hero-buttons">

            <button
  className="primary-btn"
  onClick={onBookService}
>
  Book a Service
  <span>→</span>
</button>

            <button className="outline-btn">
              Explore Services
            </button>

          </div>

          {/* STATS */}
          <div className="hero-stats">

            <div className="stat-item">
              <strong>10K+</strong>
              <span>Bikes Serviced</span>
            </div>

            <div className="stat-item">
              <strong>500+</strong>
              <span>Expert Mechanics</span>
            </div>

            <div className="stat-item">
              <strong>4.9★</strong>
              <span>Customer Rating</span>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="bike-image-container">

  <img
    src={bikeHero}
    alt="Professional Bike"
    className="bike-hero-image"
  />

</div>


          {/* FLOATING CARD */}
          <div className="floating-card">

            <div className="floating-icon">
              ✓
            </div>

            <div>
              <strong>Trusted Service</strong>
              <span>Professional Mechanics</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero