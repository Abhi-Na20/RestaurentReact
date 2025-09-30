import React, { useEffect, useState } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import Cookies from 'js-cookie';

function YourOrder() {
  const [orders, setOrders] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [openDetails, setOpenDetails] = useState({});
  const userEmail = Cookies.get('user');

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userEmail) {
      setOrders([]);
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const timers = JSON.parse(localStorage.getItem('orderTimers')) || {};

    const userOrders = storedOrders.filter(order => order.userEmail === userEmail);

    const updatedOrders = userOrders.map(order => {
      if (!timers[order.id]) timers[order.id] = Date.now();

      const elapsed = (now - timers[order.id]) / 1000; 
      order.elapsed = elapsed;

      if (elapsed >= 270) order.status = 'Delivered';
      else if (elapsed >= 180) order.status = 'Order Successful';
      else order.status = 'Processing';

      order.progress = Math.min((elapsed / 270) * 100, 100);
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.setItem('orderTimers', JSON.stringify(timers));
  }, [userEmail, now]);

  const getStatusInfo = (order) => {
    let stage = '';
    let color = '';

    if (order.status === 'Delivered') {
      stage = '✅ Delivered';
      color = '#28a745';
    } else if (order.status === 'Order Successful') {
      stage = '🚗 Order on the way';
      color = '#FFD700';
    } else {
      stage = '🧑‍🍳 Food is being prepared';
      color = '#17a2b8';
    }

    return { stage, color };
  };

  const toggleDetails = (id) => setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'#2c2c2c', color:'#f5f5f5' }}>
      <NavbarRes />
      <main style={{ flexGrow:1 }}>
        <div className="container my-5">
          <div className="text-center mb-5">
            <h1 style={{ color:'#FFD700', fontWeight:'700' }}>📦 Your Orders</h1>
            <p style={{ color:'#ccc', fontSize:'1.1rem' }}>Below is a list of your recent food orders.</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-5" style={{ color:'#999' }}>
              You have no orders yet.
            </div>
          ) : (
            <div className="row justify-content-center">
              {orders.map(order => {
                const { stage, color } = getStatusInfo(order);

                return (
                  <div className="col-md-6 col-lg-5 mb-4" key={order.id}>
                    <div style={{
                      background:'#3a3a3a',
                      borderRadius:'1rem',
                      padding:'1.5rem',
                      boxShadow:'0 10px 25px rgba(0,0,0,0.5)',
                    }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 style={{ color:'#FFD700', marginBottom:0 }}>Order #{order.id}</h5>
                        <span style={{
                          backgroundColor: color,
                          color:'#111',
                          borderRadius:'0.5rem',
                          padding:'0.3rem 0.8rem',
                          fontWeight:'600',
                          fontSize:'0.9rem'
                        }}>{stage}</span>
                      </div>

                      <ul style={{ listStyle:'none', padding:0, marginBottom:'1rem', color:'#ccc' }}>
                        <li><strong>Date:</strong> {order.date}</li>
                        <li><strong>Total:</strong> Dhs {order.total}</li>
                      </ul>

                      <div className="text-end">
                        <button
                          style={{
                            background:'transparent',
                            border:'1px solid #FFD700',
                            color:'#FFD700',
                            borderRadius:'0.5rem',
                            padding:'0.3rem 0.7rem',
                            cursor:'pointer'
                          }}
                          onClick={() => toggleDetails(order.id)}
                        >
                          {openDetails[order.id] ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>

                      {openDetails[order.id] && (
                        <div className="mt-3">
                          <p><strong>Items:</strong> {order.items.join(', ')}</p>
                          <p><strong>Status:</strong> {stage}</p>
                          <div style={{ height:'22px', background:'#555', borderRadius:'0.5rem', overflow:'hidden' }}>
                            <div style={{
                              width:`${order.progress}%`,
                              backgroundColor: color,
                              height:'100%',
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'center',
                              color:'#111',
                              fontWeight:'600',
                              fontSize:'0.8rem',
                              transition:'width 0.5s ease'
                            }}>
                              {stage}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default YourOrder;
