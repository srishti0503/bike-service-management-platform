function Navbar({ onBookService }) {
  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <a href="#home" className="brand">
          <span className="brand-icon">🏍️</span>

          <div className="brand-text">
            <span className="brand-name">BIKE</span>
            <span className="brand-subtitle">SERVICE</span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#track">Track Service</a>
          <a href="#about">About Us</a>
        </nav>

        {/* Right Side Buttons */}
        <div className="nav-actions">
          <button className="login-btn">
            Login
          </button>

          <button
  className="book-btn"
  onClick={onBookService}
>
  Book Now
</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-btn">
          ☰
        </button>

      </div>
    </header>
  )
}

export default Navbar