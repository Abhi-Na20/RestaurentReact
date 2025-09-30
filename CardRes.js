import React, { useState, useEffect } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CardRes() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [couponValid, setCouponValid] = useState(null);
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '', type: 'visa' });
  const [error, setError] = useState('');

  const totalAmount = 100; // Change this to dynamic total later

  useEffect(() => {
    const points = parseInt(localStorage.getItem('userPoints')) || 0;
    setUserPoints(points);
    if (usePoints) {
      const discount = (points / 1).toFixed(2); // 1 point = 1 Dhs
      setPointsDiscount(discount);
    } else {
      setPointsDiscount(0);
    }
  }, [usePoints]);

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const validateCardInputs = () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      return 'Please fill all card details.';
    }
    if (!/^\d{16}$/.test(card.number)) {
      return 'Card number must be 16 digits.';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      return 'Expiry must be in MM/YY format.';
    }
    if (!/^\d{3,4}$/.test(card.cvv)) {
      return 'CVV must be 3 or 4 digits.';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (paymentMethod === 'card') {
      const validationMsg = validateCardInputs();
      if (validationMsg) {
        setError(validationMsg);
        return;
      }
      if (usePoints && userPoints <= 0) {
        setError('You do not have enough points to use.');
        return;
      }
    }

    navigate('/summary');
  };

  const handleCouponValidate = () => {
    if (coupon.toLowerCase() === 'save10') {
      setCouponValid(true);
    } else {
      setCouponValid(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark-grey text-light">
      <NavbarRes />

      <main className="flex-grow-1">
        <div className="container my-4 p-4 bg-dark-grey shadow-lg rounded-4" style={{ maxWidth: '600px' }}>
          {/* Step Progress Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 px-2">
            {['Address', 'Payment', 'Summary', 'Done'].map((step, idx) => (
              <div key={step} className="text-center" style={{ width: '25%' }}>
                <div
                  className="rounded-pill py-1 fw-bold"
                  style={{
                    backgroundColor: idx === 1 ? '#b8860b' : '#343a40',
                    color: idx === 1 ? '#fff' : '#adb5bd',
                    userSelect: 'none',
                    boxShadow: idx === 1 ? '0 0 8px #b8860b' : 'none',
                  }}
                >
                  {idx + 1}
                </div>
                <small
                  style={{
                    color: idx === 1 ? '#f9d976' : '#6c757d',
                    marginTop: '0.3rem',
                    display: 'block',
                    fontWeight: 600,
                  }}
                >
                  {step}
                </small>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="progress mb-4" style={{ height: '8px', backgroundColor: '#343a40' }}>
            <div className="progress-bar" style={{ width: '50%', backgroundColor: '#b8860b' }} />
          </div>

          <h4 className="text-center mb-4" style={{ color: '#b8860b', fontWeight: '700' }}>
            Choose Payment Method
          </h4>

          {error && (
            <div
              className="alert alert-danger"
              style={{
                backgroundColor: '#b94a48',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <select
              className="form-select mb-3 input-custom"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ color: '#fff', fontWeight: '600' }}
            >
              <option value="card" style={{ backgroundColor: '#3a3a3a', color: '#fff' }}>
                Card
              </option>
              <option value="cash" style={{ backgroundColor: '#3a3a3a', color: '#fff' }}>
                Cash
              </option>
            </select>

            {paymentMethod === 'card' && (
              <>
                <input
                  className="form-control mb-2 input-custom"
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={card.name}
                  onChange={handleCardChange}
                  required
                  spellCheck="false"
                />
                <input
                  className="form-control mb-2 input-custom"
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  value={card.number}
                  onChange={handleCardChange}
                  required
                  spellCheck="false"
                />
                <input
                  className="form-control mb-2 input-custom"
                  type="text"
                  name="expiry"
                  placeholder="Expiry Date (MM/YY)"
                  value={card.expiry}
                  onChange={handleCardChange}
                  required
                  spellCheck="false"
                />
                <input
                  className="form-control mb-3 input-custom"
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={handleCardChange}
                  required
                  spellCheck="false"
                />

                {/* Use Golden Points Checkbox */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="usePointsCard"
                    checked={usePoints}
                    onChange={() => setUsePoints(!usePoints)}
                    disabled={userPoints <= 0}
                    style={{ cursor: userPoints <= 0 ? 'not-allowed' : 'pointer' }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="usePointsCard"
                    style={{ color: '#f9d976', fontWeight: '600' }}
                  >
                    Use Golden Points ({pointsDiscount} Dhs off)
                  </label>
                </div>

                {/* Coupon input */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control input-custom"
                    placeholder="Coupon Code (e.g., SAVE10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    spellCheck="false"
                  />
                  <button
                    className="btn btn-outline-warning"
                    type="button"
                    onClick={handleCouponValidate}
                    style={{ color: '#b8860b', borderColor: '#b8860b' }}
                  >
                    Apply
                  </button>
                </div>
                {couponValid === true && (
                  <div className="text-success mb-2" style={{ fontWeight: '600' }}>
                    Coupon Applied!
                  </div>
                )}
                {couponValid === false && (
                  <div className="text-danger mb-2" style={{ fontWeight: '600' }}>
                    Invalid Coupon
                  </div>
                )}
              </>
            )}

            <button type="submit" className="btn btn-warning w-100 mt-2" style={{ fontWeight: '600' }}>
              Continue to Summary
            </button>
          </form>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .bg-dark-grey {
          background-color: #212529;
          color: #fff;
        }

        .input-custom {
          background-color: #3a3a3a;
          border: 2px solid #b8860b;
          color: #ffffff;
          font-weight: 700;
          border-radius: 0.5rem;
          padding: 0.55rem 1rem;
          font-size: 1rem;
          transition: box-shadow 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
          caret-color: #f9d976;
        }

        .input-custom::placeholder {
          color: #d4af37cc;
          opacity: 1;
          font-weight: 600;
        }

        .input-custom:focus {
          box-shadow: 0 0 10px #b8860b;
          outline: none;
          background-color: #454545;
        }

        .btn-outline-warning:hover,
        .btn-outline-warning:focus {
          background-color: #b8860b;
          color: #121212;
          border-color: #b8860b;
          box-shadow: 0 0 8px #b8860b;
        }

        .alert-danger {
          background-color: #b94a48;
          color: white;
          border-radius: 0.5rem;
          font-weight: 600;
          text-align: center;
        }

        .form-check-input:disabled {
          background-color: #6c757d;
          border-color: #6c757d;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default CardRes;
