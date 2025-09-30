import React from 'react';
import { Link } from 'react-router-dom';

function NavbarRes() {
  const user = localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('profile');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid position-relative">
        <Link className="navbar-brand ms-3 text-warning fw-bold fs-3" to="/">
          The Golden Spoon
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="position-absolute start-50 translate-middle-x d-none d-lg-flex">
          <ul className="navbar-nav fs-5 fw-semibold">
            {['About Us', 'Menu', 'Contact', 'Basket'].map((item) => (
              <li key={item} className="nav-item mx-3">
                <Link to={`/${item.toLowerCase().replace(/\s/g, '')}`} className="nav-link text-light hover-underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div className="d-flex align-items-center me-3">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-warning dropdown-toggle px-4"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.split('@')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/orders">Your Orders</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-warning me-2 fw-semibold px-4 py-2">Login</Link>
                <Link to="/register" className="btn btn-warning fw-semibold px-4 py-2 shadow-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-underline:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: text-decoration 0.3s ease;
        }
      `}</style>
    </nav>
  );
}

export default NavbarRes;
