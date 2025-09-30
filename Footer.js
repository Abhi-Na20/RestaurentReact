import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 shadow-lg">
      <div className="container px-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h4 className="fw-bold text-warning mb-2">The Golden Spoon</h4>
            <p className="text-light opacity-75 small">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="col-md-4 text-center text-md-end mx-auto">
            <h5 className="fw-bold text-white mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              {[
                { href: '#', icon: 'fab fa-facebook-f' },
                { href: '#', icon: 'fab fa-instagram' },
                { href: '#', icon: 'fab fa-twitter' },
                { href: '#', icon: 'fab fa-linkedin-in' },
              ].map(({ href, icon }) => (
                <a
                  key={icon}
                  href={href}
                  className="text-warning fs-4 footer-icon"
                  aria-label={icon.replace('fab fa-', '')}
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .footer-icon {
            transition: color 0.3s ease;
          }
          .footer-icon:hover {
            color: #ffc107;
            text-shadow: 0 0 5px #ffc107;
          }
        `}</style>
      </div>
    </footer>
  );
}

export default Footer;
