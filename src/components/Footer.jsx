function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <h3>
            🏍️ Bike Service
          </h3>

          <p>
            Your trusted platform for professional
            bike servicing and maintenance.
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-links">

          <h4>Quick Links</h4>

          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#track">Track Service</a>

        </div>


        {/* Contact */}
        <div className="footer-contact">

          <h4>Contact Us</h4>

          <p>📞 +91 98765 43210</p>
          <p>✉️ support@bikeservice.com</p>
          <p>📍 Greater Noida, India</p>

        </div>

      </div>


      {/* Copyright */}
      <div className="footer-bottom">

        <p>
          © 2026 Bike Service & Management Platform.
          All rights reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer