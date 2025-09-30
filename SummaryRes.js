import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarRes from './NavbarRes';
import Footer from './Footer';

function SummaryRes() {
  const navigate = useNavigate();

  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const deliveryFee = 10;
  const pointsDiscount = parseFloat(localStorage.getItem('pointsDiscount')) || 0;

  const subtotal = basket.reduce((sum, item) => sum + item.price * item.qty, 0);
  const VAT_RATE = 0.05;
  const vatAmount = (subtotal + deliveryFee) * VAT_RATE;
  const totalBeforeDiscount = subtotal + deliveryFee + vatAmount;
  const totalAfterDiscount = totalBeforeDiscount - pointsDiscount;

  const handlePlaceOrder = () => {
    navigate('/success');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark-grey text-light">
      <NavbarRes />

      <main className="flex-grow-1">
        <div className="container my-4 p-4 bg-dark-grey shadow-lg rounded-4" style={{ maxWidth: '600px' }}>
          {/* Progress Steps */}
          <div className="d-flex justify-content-between align-items-center mb-4 px-2">
            {[
              { label: 'Address', bg: '#b8860b', active: true },
              { label: 'Payment', bg: '#b8860b', active: true },
              { label: 'Summary', bg: '#198754', active: true },
              { label: 'Done', bg: '#343a40', active: false },
            ].map(({ label, bg, active }, idx) => (
              <div key={label} className="text-center" style={{ width: '25%' }}>
                <div
                  className="rounded-pill py-1 fw-bold"
                  style={{
                    backgroundColor: bg,
                    color: active ? '#fff' : '#adb5bd',
                    boxShadow: active ? `0 0 8px ${bg}` : 'none',
                    userSelect: 'none',
                  }}
                >
                  {idx + 1}
                </div>
                <small
                  style={{
                    color: active ? (bg === '#343a40' ? '#6c757d' : '#f9d976') : '#6c757d',
                    marginTop: '0.3rem',
                    display: 'block',
                    fontWeight: 600,
                  }}
                >
                  {label}
                </small>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="progress mb-4" style={{ height: '8px', backgroundColor: '#343a40' }}>
            <div className="progress-bar" style={{ width: '75%', backgroundColor: '#198754' }} />
          </div>

          {/* Summary Content */}
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#b8860b' }}>
            🧾 Order Summary
          </h2>

          <div className="card summary-card p-4 mb-3">
            {basket.length === 0 && (
              <p className="text-center text-muted">Your basket is empty.</p>
            )}
            {basket.map((item, i) => (
              <div key={i} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.qty}</span>
                <span>Dhs {(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>Dhs {subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Fee:</span>
              <span>Dhs {deliveryFee.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>VAT (5%):</span>
              <span>Dhs {vatAmount.toFixed(2)}</span>
            </div>

            {pointsDiscount > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success" style={{ color: '#28a745' }}>
                <span>Golden Points Discount:</span>
                <span>- Dhs {pointsDiscount.toFixed(2)}</span>
              </div>
            )}

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5" style={{ color: '#ffc107' }}>
              <span>Total:</span>
              <span>Dhs {totalAfterDiscount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn btn-success w-100"
            style={{ backgroundColor: '#198754', borderColor: '#198754', fontWeight: '600' }}
          >
            Order Now
          </button>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .bg-dark-grey {
          background-color: #212529;
          color: #fff;
        }
        .summary-card {
          background-color: #2b3035;
          border: 1px solid #444;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border-radius: 1rem;
          color: #fff;
        }
        hr {
          border-color: #444;
        }
      `}</style>
    </div>
  );
}

export default SummaryRes;
