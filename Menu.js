import React from 'react';

function Menu() {
  return (
    <div className="container my-5 py-5 bg-white text-dark shadow-xl rounded-4">
      <div className="text-center">
        <h1 className="display-3 fw-bolder mb-4 text-warning text-uppercase">Our Delicious Menu</h1>
        <p className="lead mb-5 text-secondary opacity-90 px-4">
          Explore a world of flavors crafted with the freshest ingredients and culinary passion.
        </p>
      </div>

      <div className="row justify-content-center mb-5 px-4">
        <div className="col-12">
          <h2 className="fs-1 fw-bold text-warning mb-4 py-2 px-3 bg-warning-subtle rounded-pill d-inline-block shadow-sm">Appetizers</h2>
          <div className="row g-4 text-start mt-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Crispy Calamari <span className="float-end text-warning">$12.99</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Garlic Parmesan Fries <span className="float-end text-warning">$7.50</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Bruschetta <span className="float-end text-warning">$9.00</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Mozzarella Sticks <span className="float-end text-warning">$8.25</span></h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5 px-4">
        <div className="col-12">
          <h2 className="fs-1 fw-bold text-warning mb-4 py-2 px-3 bg-warning-subtle rounded-pill d-inline-block shadow-sm">Main Courses</h2>
          <div className="row g-4 text-start mt-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Signature Beef Burger <span className="float-end text-warning">$15.99</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Grilled Salmon <span className="float-end text-warning">$22.00</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Chicken Alfredo Pasta <span className="float-end text-warning">$18.50</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Vegetarian Pizza <span className="float-end text-warning">$17.00</span></h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5 px-4">
        <div className="col-12">
          <h2 className="fs-1 fw-bold text-warning mb-4 py-2 px-3 bg-warning-subtle rounded-pill d-inline-block shadow-sm">Desserts</h2>
          <div className="row g-4 text-start mt-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Chocolate Lava Cake <span className="float-end text-warning">$9.50</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">New York Cheesecake <span className="float-end text-warning">$8.75</span></h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center px-4">
        <div className="col-12">
          <h2 className="fs-1 fw-bold text-warning mb-4 py-2 px-3 bg-warning-subtle rounded-pill d-inline-block shadow-sm">Drinks</h2>
          <div className="row g-4 text-start mt-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Fresh Orange Juice <span className="float-end text-warning">$5.00</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Espresso <span className="float-end text-warning">$3.50</span></h5>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-dark">Sparkling Water <span className="float-end text-warning">$4.00</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
