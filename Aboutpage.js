import React from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';

function AboutPage() {
  return (
    <>
      <NavbarRes />
      <div className="container my-5 py-5 bg-dark-grey text-light shadow-lg rounded-4">
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bolder mb-4 text-warning text-uppercase about-title">
            About Us
          </h1>
          <p className="lead text-light opacity-90 px-4 about-subtitle">
            Learn about our restaurant's journey and values.
          </p>
        </div>

        <div className="row justify-content-center align-items-center mb-5 py-4 px-4 border-bottom border-warning-subtle about-section">
          <div className="col-md-6 order-md-2 mb-4 mb-md-0">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2023/8/335016829/CJ/VW/RH/148640419/hire-kitchen-chef-team-for-restaurant-500x500.jpg"
              alt="Our Story"
              className="img-fluid rounded-4 shadow about-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/FFD700/000000?text=Our+Story';
              }}
            />
          </div>
          <div className="col-md-6 order-md-1 text-md-start text-center about-text">
            <h2 className="fs-1 fw-bold mb-3 section-title">Our Story</h2>
            <p className="fs-5 section-text">
              We started with a passion for great food and a vision to share it. Over time, we've grown, but our commitment to quality and service remains strong.
            </p>
          </div>
        </div>

        <div className="row justify-content-center align-items-center mb-5 py-4 px-4 border-bottom border-warning-subtle about-section">
          <div className="col-md-6 mb-4 mb-md-0 text-md-end text-center">
            <img
              src="https://www.ecoleducasse.com/application/files/5417/2665/3496/Cooking_up_profit_the_richest_chefs_in_the_world.jpg"
              alt="Our Mission"
              className="img-fluid rounded-4 shadow about-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/000000/FFD700?text=Our+Mission';
              }}
            />
          </div>
          <div className="col-md-6 text-md-start text-center about-text">
            <h2 className="fs-1 fw-bold mb-3 section-title">Our Mission</h2>
            <p className="fs-5 section-text">
              Our goal is to provide exceptional dining experiences every time. We use fresh ingredients, offer a welcoming space, and always strive to improve for you.
            </p>
          </div>
        </div>

        <div className="row justify-content-center mb-5 py-4 px-4">
          <div className="col-12 text-center">
            <h2 className="fs-1 fw-bold mb-4 section-title">Our Values</h2>
            <div className="row justify-content-center g-4">
              {[
                {
                  icon: 'fas fa-gem',
                  title: 'Quality',
                  text: 'Top standards in food and making it.',
                },
                {
                  icon: 'fas fa-heart',
                  title: 'Passion',
                  text: 'Cooking with creativity and love.',
                },
                {
                  icon: 'fas fa-users',
                  title: 'Community',
                  text: 'Serving our local friends and neighbors.',
                },
              ].map(({ icon, title, text }) => (
                <div className="col-md-4" key={title}>
                  <div className="p-4 bg-secondary bg-opacity-25 rounded-4 shadow-sm h-100 about-value-card hover-scale">
                    <i className={`${icon} fs-2 text-warning mb-3`}></i>
                    <h5 className="fw-bold text-light mb-2">{title}</h5>
                    <p className="text-light small opacity-75">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <a href="/contact" className="btn btn-warning btn-lg shadow-lg text-dark fw-bold mt-5 px-5 py-3 rounded-pill hover-scale-btn">
            Contact Us
          </a>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        body {
          background-color: #1e1e1e;
          color: #ccc;
        }

        .bg-dark-grey {
          background-color: #212529;
        }

        .about-title {
          letter-spacing: 0.15em;
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.3);
        }

        .about-subtitle {
          font-size: 1.4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          color: #ccc;
        }

        .about-section {
          transition: background-color 0.3s ease;
          border-color: #f9d976;
          border-width: 2px;
        }

        .about-img {
          box-shadow: 0 8px 24px rgb(0 0 0 / 0.25);
          border-radius: 20px;
          object-fit: cover;
          width: 100%;
          height: auto;
          max-height: 400px;
          transition: transform 0.3s ease;
        }

        .about-img:hover {
          transform: scale(1.05);
        }

        .about-text {
          padding: 0 1rem;
        }

        .section-title {
          color: #b8860b; /* dark goldenrod */
          margin-bottom: 1rem;
        }

        .section-text {
          font-weight: 400;
          color: #ddd;
          line-height: 1.7;
        }

        .about-value-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }

        .about-value-card:hover,
        .hover-scale-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 28px rgb(184 134 11 / 0.4);
        }

        .hover-scale-btn {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </>
  );
}

export default AboutPage;
