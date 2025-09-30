import React, { useState, useEffect } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import { Modal } from 'react-bootstrap';

function BasketRes() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('basket');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const handleQtyChange = (index, newQty) => {
    const updatedItems = [...items];
    updatedItems[index].qty = parseInt(newQty);
    setItems(updatedItems);
    localStorage.setItem('basket', JSON.stringify(updatedItems));
  };

  const handleDelete = (name) => {
    const newItems = items.filter(item => item.name !== name);
    setItems(newItems);
    localStorage.setItem('basket', JSON.stringify(newItems));
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const qtyOptions = [1,2,3,4,5,6,7,8,9,10];
  const loggedIn = !!localStorage.getItem('loggedInUser');

  const handleCheckoutClick = () => {
    if (loggedIn) {
      window.location.href = '/address';
    } else {
      setShowModal(true);
    }
  };

  const proceedWithoutLogin = () => {
    setShowModal(false);
    window.location.href = '/address';
  };

  return (
    <>
      <div className="page-wrapper">
        <NavbarRes />
        <main className="container basket-container">
          <div className="header text-center">
            <h1>🛒 Your Basket</h1>
            <p>Review your items before proceeding to checkout.</p>
          </div>

          {items.length === 0 ? (
            <div className="empty-msg">Your basket is currently empty.</div>
          ) : (
            <div className="basket-card">
              <table className="basket-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Dish</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <select
                          value={item.qty}
                          onChange={(e) => handleQtyChange(index, e.target.value)}
                          className="qty-select"
                        >
                          {qtyOptions.map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </td>
                      <td>{item.price.toFixed(2)} Dhs</td>
                      <td>{(item.qty * item.price).toFixed(2)} Dhs</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(item.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {items.length > 0 && (
            <div className="footer">
              <h3>Total: <span>{total.toFixed(2)} Dhs</span></h3>
              <button className="btn-checkout" onClick={handleCheckoutClick}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="bg-gold">
          <Modal.Title className="text-dark fw-bold">
            Sign In & Save!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-5">
          Sign in or register to get <strong>10% off</strong> or <strong>free delivery</strong> on your first 3 orders!
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-gold text-dark fw-bold"
            onClick={() => (window.location.href = '/login')}
          >
            Login / Register
          </button>
          <button
            className="btn btn-secondary"
            onClick={proceedWithoutLogin}
          >
            Proceed Without Login
          </button>
          <button
            className="btn btn-light"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        /* Colors */
        :root {
          --gold: #d4af37;
          --dark-grey: #1f1f1f;
          --dark-card: #2f2f2f;
          --light-grey: #ccc;
          --gold-hover: #f0c94a;
        }

        .page-wrapper {
          background-color: var(--dark-grey);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .basket-container {
          flex-grow: 1;
          max-width: 900px;
          margin: 3rem auto;
          background-color: var(--dark-card);
          border-radius: 16px;
          padding: 2rem 3rem;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
          color: var(--gold);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header h1 {
          font-size: 2.75rem;
          margin-bottom: 0.3rem;
          font-weight: 900;
          color: var(--gold);
          letter-spacing: 0.1em;
          text-shadow: 0 0 8px var(--gold);
        }

        .header p {
          color: var(--light-grey);
          font-size: 1.15rem;
          margin-bottom: 2rem;
        }

        .empty-msg {
          color: #888;
          font-size: 1.25rem;
          text-align: center;
          padding: 4rem 0;
        }

        .basket-card {
          overflow-x: auto;
        }

        .basket-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
          font-size: 1rem;
          color: var(--gold);
        }

        .basket-table thead tr th {
          text-align: center;
          font-weight: 700;
          padding-bottom: 0.6rem;
          border-bottom: 2px solid var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .basket-table tbody tr {
          background-color: var(--dark-grey);
          border-radius: 10px;
          transition: background-color 0.3s ease;
        }

        .basket-table tbody tr:hover {
          background-color: var(--gold-hover);
          color: var(--dark-grey);
          cursor: default;
        }

        .basket-table tbody tr td {
          text-align: center;
          padding: 14px 12px;
          vertical-align: middle;
          font-weight: 600;
        }

        .qty-select {
          background-color: var(--dark-card);
          border: 1.5px solid var(--gold);
          color: var(--gold);
          border-radius: 8px;
          padding: 5px 14px;
          font-weight: 700;
          text-align: center;
          min-width: 60px;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .qty-select:hover, .qty-select:focus {
          border-color: var(--gold-hover);
          outline: none;
          box-shadow: 0 0 10px var(--gold-hover);
        }

        .btn-delete {
          background: transparent;
          border: 1.5px solid var(--gold);
          color: var(--gold);
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 12px;
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
          user-select: none;
        }

        .btn-delete:hover {
          background-color: var(--gold-hover);
          color: var(--dark-grey);
          border-color: var(--gold-hover);
          box-shadow: 0 0 10px var(--gold-hover);
        }

        .footer {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer h3 {
          font-weight: 900;
          color: var(--gold);
        }

        .footer h3 span {
          color: #4ee44e;
        }

        .btn-checkout {
          background-color: var(--gold);
          color: var(--dark-grey);
          font-weight: 900;
          border: none;
          border-radius: 30px;
          padding: 14px 36px;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.7);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }

        .btn-checkout:hover {
          background-color: var(--gold-hover);
          box-shadow: 0 0 30px var(--gold-hover);
        }

        /* Modal styling overrides */
        .bg-gold {
          background-color: var(--gold) !important;
        }

        .btn-outline-gold {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
        }
        .btn-outline-gold:hover {
          background-color: var(--gold);
          color: var(--dark-grey) !important;
        }

        @media (max-width: 767px) {
          .basket-container {
            padding: 1.5rem 1rem;
            margin: 2rem 1rem;
          }
          .header h1 {
            font-size: 2rem;
          }
          .basket-table tbody tr td {
            font-size: 0.9rem;
            padding: 8px 6px;
          }
          .btn-checkout {
            width: 100%;
            padding: 14px 0;
            font-size: 1.2rem;
          }
          .footer {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </>
  );
}

export default BasketRes;
