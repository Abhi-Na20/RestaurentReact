import React from "react";

function Services() {
  const services = [
    {
      icon: "fas fa-utensils",
      title: "Private Dining",
      description: "Perfect for intimate gatherings and special occasions.",
    },
    {
      icon: "fas fa-truck-moving",
      title: "Catering Services",
      description: "Gourmet experiences delivered to your events.",
    },
    {
      icon: "fas fa-chalkboard-teacher",
      title: "Culinary Workshops",
      description: "Learn fine cuisine from master chefs in hands-on classes.",
    },
  ];

  return (
    <section className="services-section py-5">
      <div className="container">
        <h2
          className="text-center display-5 fw-bold mb-5"
          style={{ color: "#ffc107" }}
          data-aos="fade-up"
        >
          ✨ Our Exceptional Services
        </h2>

        <div className="row g-4 justify-content-center">
          {services.map(({ icon, title, description }, index) => (
            <div
              key={title}
              className="col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-card text-center p-4 h-100 rounded-4">
                <div className="icon-wrapper mb-4">
                  <i
                    className={`${icon} fa-3x text-warning icon-animate`}
                    aria-hidden="true"
                  ></i>
                </div>
                <h5 className="fw-bold fs-4" style={{ color: "#ffc107" }}>
                  {title}
                </h5>
                <p style={{ color: "#f8f9fa", opacity: 0.85 }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-section {
          background: #212529; /* Deep gray background */
        }

        .service-card {
          background: #2b3035; /* Slightly lighter than section background */
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.15);
          border: 1px solid #ffc107;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 30px rgba(255, 193, 7, 0.45);
          border-color: #ffca28;
        }

        .icon-wrapper {
          transition: transform 0.5s ease;
        }

        .service-card:hover .icon-wrapper {
          transform: rotateY(360deg);
        }

        .icon-animate {
          transition: color 0.3s;
          color: #ffc107;
        }

        .service-card:hover .icon-animate {
          color: #fff3cd;
        }
      `}</style>
    </section>
  );
}

export default Services;
