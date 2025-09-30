import React from 'react';

function Hero() {
  return (
    <div
      className="text-light text-center d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div className="bg-dark bg-opacity-50 p-5 rounded shadow-lg" data-aos="zoom-in">
        <h1 className="display-2 fw-bold mb-4 text-warning">Savor the Flavors</h1>
        <p className="lead fs-4 text-white">
          Experience the golden standard of fine dining. Where tradition meets taste.
        </p>
        <a href="/Menu" className="btn btn-warning btn-lg mt-4 fw-bold px-5 py-3 rounded-pill shadow">
          View Full Menu
        </a>
      </div>
    </div>
  );
}

export default Hero;
