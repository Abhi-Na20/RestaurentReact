import React, { useState, useEffect } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function AddressRes() {
  const navigate = useNavigate();

  const defaultAddress = {
    building: '',
    area: '',
    city: '',
    county: '',
    country: '',
    postalCode: '',
  };

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newAddress, setNewAddress] = useState(defaultAddress);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Load saved addresses
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [defaultAddress];
    setAddresses(savedAddresses);
  }, []);

  // Geolocation
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addr = data.address || {};

          const detectedAddress = {
            building: addr.house_number || '',
            area: addr.road || addr.neighbourhood || '',
            city: addr.city || addr.town || addr.village || '',
            county: addr.county || '',
            country: addr.country || '',
            postalCode: addr.postcode || '',
          };

          setNewAddress(detectedAddress);
          setErrorMessage('');
        } catch (err) {
          console.error(err);
          setErrorMessage('Failed to detect address. Please enter manually.');
        }

        setLoadingLocation(false);
      },
      (err) => {
        console.error(err);
        setErrorMessage('Permission denied or unable to get location.');
        setLoadingLocation(false);
      }
    );
  };

  const handleSelect = (index) => setSelectedIndex(index);

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
    setErrorMessage('');
  };

  const addNewAddress = () => {
    const requiredFields = ['building','area','city','county','country','postalCode'];
    if (!requiredFields.every(f => newAddress[f]?.trim().length > 0)) {
      setErrorMessage('❌ Please fill out all fields for the new address!');
      return;
    }

    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
    setNewAddress(defaultAddress);
    setSelectedIndex(updated.length - 1);
    setErrorMessage('');
  };

  const handleNext = () => {
    const chosen = addresses[selectedIndex];
    const requiredFields = ['building','area','city','county','country','postalCode'];
    if (!requiredFields.every(f => chosen[f]?.trim().length > 0)) {
      setErrorMessage('❌ Selected address is incomplete!');
      return;
    }
    localStorage.setItem('userAddress', JSON.stringify(chosen));
    navigate('/card');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 1rem',
    marginBottom: '0.7rem',
    borderRadius: '0.5rem',
    border: '1px solid #b8860b',
    background: '#3a3a3a',
    color: '#fff',
    outline: 'none'
  };

  const btnStyleGold = { backgroundColor: '#b8860b', color: '#121212', fontWeight: 600, borderRadius: '2rem', padding: '0.75rem 2rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(184, 134, 11, 0.4)' };

  return (
    <>
      <NavbarRes />
      <div className="container my-5 py-5 bg-dark-grey shadow-lg rounded-4" style={{ maxWidth: 700 }}>
        <h4 className="text-center mb-4 heading-gold">Select Your Address</h4>

        {/* Saved Addresses */}
        {addresses.map((addr, idx) => (
          <div key={idx} className={`p-3 mb-3 rounded-3 ${selectedIndex === idx ? 'border-selected' : 'border-dark'}`} onClick={() => handleSelect(idx)} style={{ cursor: 'pointer' }}>
            <strong>{addr.building}, {addr.area}</strong><br/>
            {addr.city}, {addr.county}, {addr.country} - {addr.postalCode}
          </div>
        ))}

        {/* Add New Address */}
        <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: '#2a2a2a' }}>
          <h5 className="heading-gold mb-3">Add New Address</h5>
          <button className="btn btn-warning-custom mb-3 w-100" onClick={detectLocation}>
            {loadingLocation ? 'Detecting Location...' : 'Use My Current Location'}
          </button>

          {['building','area','city','county','country','postalCode'].map(f => (
            <input
              key={f}
              className="form-control mb-2 input-custom"
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={newAddress[f]}
              onChange={(e) => handleNewAddressChange(f, e.target.value)}
            />
          ))}
          <button className="btn btn-warning-custom w-100 mt-2" onClick={addNewAddress}>Add Address</button>
        </div>

        {errorMessage && <div className="alert alert-danger py-2 mt-3">{errorMessage}</div>}

        <button className="btn btn-warning-custom w-100 mt-4" onClick={handleNext}>Next</button>
      </div>
      <Footer />

      <style jsx>{`
        .bg-dark-grey { background-color: #212529; color: #fff; }
        .heading-gold { color: #b8860b; font-weight: 700; }
        .input-custom {
          background-color: #3a3a3a;
          border: 2px solid #b8860b;
          color: #ffffff;
          font-weight: 700;
          border-radius: 0.75rem;
          padding: 0.65rem 1rem;
          font-size: 1rem;
          transition: box-shadow 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.6);
          caret-color: #f9d976;
        }
        .input-custom::placeholder { color: #d4af37cc; opacity: 1; font-weight: 600; }
        .input-custom:focus { box-shadow: 0 0 10px #b8860b; outline: none; background-color: #454545; }

        .border-selected { border: 2px solid #f9d976; background-color: #343434; }
        .border-dark { border: 2px solid #555; }

        .btn-warning-custom { background-color: #b8860b; color: #121212; font-weight: 600; border-radius: 2rem; padding: 0.75rem 2rem; transition: background-color 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 4px 12px rgba(184, 134, 11, 0.4); border: none; }
        .btn-warning-custom:hover { background-color: #f9d976; box-shadow: 0 6px 16px rgba(249, 217, 118, 0.6); color: #121212; }
        .alert-danger { background-color: #b94a48; color: white; border-radius: 0.5rem; font-weight: 600; text-align: center; }
      `}</style>
    </>
  );
}

export default AddressRes;
