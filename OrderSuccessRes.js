import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarRes from './NavbarRes';
import Footer from './Footer';

function OrderSuccessRes() {
  const navigate = useNavigate();

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const userEmail = Cookies.get('user');

    if (basket.length > 0 && userEmail) {
      const total = basket.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

      const newOrder = {
        id: Date.now(),
        userEmail,
        items: basket.map(item => item.name),
        total,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

      // POINT SYSTEM
      const earnedPoints = Math.floor(parseFloat(total) / 0.5);

      const userPoints = JSON.parse(localStorage.getItem('userPoints')) || {};
      const currentPoints = userPoints[userEmail] || 0;
      userPoints[userEmail] = currentPoints + earnedPoints;

      localStorage.setItem('userPoints', JSON.stringify(userPoints));

      localStorage.removeItem('basket');
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark-grey text-light">
      <NavbarRes />
      <main className="flex-grow-1">
        <div
          className="container my-5 py-5 text-center shadow-lg rounded-4"
          style={{ maxWidth: '600px', backgroundColor: '#2b3035' }}
        >
          <h2 style={{ color: '#28a745' }}>✅ Payment Successful!</h2>
          <p style={{ color: '#ffc107', fontWeight: '600' }}>Your order is confirmed.</p>
          <p style={{ color: '#ddd' }}>Redirecting to homepage...</p>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .bg-dark-grey {
          background-color: #212529;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default OrderSuccessRes;
