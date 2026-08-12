function Services() {
  const services = [
    {
      icon: "🔧",
      title: "General Service",
      description:
        "Complete inspection and maintenance to keep your bike running smoothly.",
    },
    {
      icon: "⚙️",
      title: "Engine Repair",
      description:
        "Professional engine diagnostics and repair by experienced mechanics.",
    },
    {
      icon: "🛢️",
      title: "Oil Change",
      description:
        "Premium engine oil replacement for better performance and mileage.",
    },
    {
      icon: "🛞",
      title: "Brake & Tyres",
      description:
        "Complete brake inspection and tyre maintenance for safer rides.",
    },
    {
      icon: "🔋",
      title: "Battery Service",
      description:
        "Battery inspection, replacement and electrical system diagnostics.",
    },
    {
      icon: "✨",
      title: "Washing & Detailing",
      description:
        "Deep cleaning, polishing and detailing to restore your bike's shine.",
    },
  ]

  return (
    <section id="services" className="services">
      <div className="section-container">

        {/* Section Heading */}
        <div className="section-heading">
          <span>OUR SERVICES</span>

          <h2>Everything Your Bike Needs</h2>

          <p>
            From routine maintenance to major repairs,
            our experts provide complete bike care.
          </p>
        </div>

        {/* Service Cards */}
        <div className="services-grid">

          {services.map((service, index) => (
            <div className="service-card" key={index}>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button>
                Explore Service →
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Services