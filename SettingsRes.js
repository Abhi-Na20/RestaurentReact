import React, { useState, useEffect } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Input({ label, name, value, onChange, type = 'text', style, error }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#FFD700', fontWeight: '600' }}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} style={style} />
      {error && <p style={{ color: '#FF4C4C', margin: '0.3rem 0 0 0' }}>{error}</p>}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{
      background: '#2b2b2b',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '2rem' }}>{title}</h2>
      {children}
    </div>
  );
}

function SettingsRes() {
  const navigate = useNavigate();

  const defaultProfile = { name: '', email: '', phone: '' };
  const defaultAddress = { building:'', area:'', city:'', county:'', country:'', postalCode:'' };
  const defaultCard = { number:'', name:'', expiry:'', cvv:'' };

  const [profile, setProfile] = useState(defaultProfile);
  const [profileErrors, setProfileErrors] = useState({});

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState(defaultAddress);
  const [addressErrors, setAddressErrors] = useState({});

  const [cards, setCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [newCard, setNewCard] = useState(defaultCard);
  const [cardErrors, setCardErrors] = useState({});

  const [notifications, setNotifications] = useState({ emailNotifications: true, smsNotifications: false });
  const [language, setLanguage] = useState('English');
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const inputStyle = {
    width: '100%',
    padding: '0.7rem',
    marginBottom: '0.7rem',
    borderRadius: '0.5rem',
    border: '1px solid #555',
    background: '#3a3a3a',
    color: '#f5f5f5',
    outline: 'none'
  };

  const btnStyleGold = { background: '#FFD700', color: '#111', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '0.7rem', cursor: 'pointer', marginTop: '0.5rem' };
  const btnStyleRed = { background: '#FF4C4C', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' };

  // Load saved data
  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};
      const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
      const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
      const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
      const savedLanguage = localStorage.getItem('language') || 'English';

      setProfile({ ...defaultProfile, ...savedProfile });
      setAddresses(savedAddresses.filter(addr => Object.values(addr).some(v => v && v.trim() !== '')));
      setCards(savedCards.filter(card => Object.values(card).some(v => v && v.trim() !== '')));
      setNotifications({ ...notifications, ...savedNotifications });
      setLanguage(savedLanguage);
    } catch (err) {
      console.error('Failed to load settings:', err);
      setGeneralError('Failed to load settings. Please refresh the page.');
    }
  }, []);

  // Profile handlers
  const handleProfileChange = e => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setProfileErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setGeneralError('');
  };

  const validateProfile = () => {
    const errors = {};
    if (!profile.name.trim()) errors.name = 'Name is required';
    if (!profile.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(profile.email)) errors.email = 'Email is invalid';
    if (!profile.phone.trim()) errors.phone = 'Phone number is required';
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Address handlers
  const handleSelectAddress = idx => {
    setSelectedAddressIndex(idx);
    setNewAddress(addresses[idx]);
    setAddressErrors({});
  };
  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
    setAddressErrors(prev => ({ ...prev, [field]: '' }));
    setGeneralError('');
  };

  const validateAddress = () => {
    const errors = {};
    ['building','area','city','county','country','postalCode'].forEach(f => {
      if (!newAddress[f]?.trim()) errors[f] = 'Required';
    });
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addOrUpdateAddress = () => {
    if (!validateAddress()) return;
    const updated = [...addresses];
    if (selectedAddressIndex !== null) updated[selectedAddressIndex] = newAddress;
    else updated.push(newAddress);
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
    setNewAddress(defaultAddress);
    setSelectedAddressIndex(null);
    setGeneralError('');
  };

  const deleteAddress = idx => {
    if (!window.confirm('Delete this address?')) return;
    const updated = addresses.filter((_, i) => i !== idx);
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
    if (selectedAddressIndex === idx) {
      setSelectedAddressIndex(null);
      setNewAddress(defaultAddress);
    }
  };

  // Card handlers
  const handleSelectCard = idx => {
    setSelectedCardIndex(idx);
    setNewCard(cards[idx]);
    setCardErrors({});
  };
  const handleNewCardChange = (field, value) => {
    setNewCard(prev => ({ ...prev, [field]: value }));
    setCardErrors(prev => ({ ...prev, [field]: '' }));
    setGeneralError('');
  };

  const validateCard = () => {
    const errors = {};
    if (!newCard.number.trim()) errors.number = 'Card number required';
    else if (!/^\d{16}$/.test(newCard.number.replace(/\s/g,''))) errors.number = 'Card number must be 16 digits';
    if (!newCard.name.trim()) errors.name = 'Card holder name required';
    if (!newCard.expiry.trim()) errors.expiry = 'Expiry required';
    if (!newCard.cvv.trim()) errors.cvv = 'CVV required';
    else if (!/^\d{3,4}$/.test(newCard.cvv)) errors.cvv = 'CVV must be 3 or 4 digits';
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addOrUpdateCard = () => {
    if (!validateCard()) return;
    const updated = [...cards];
    if (selectedCardIndex !== null) updated[selectedCardIndex] = newCard;
    else updated.push(newCard);
    setCards(updated);
    localStorage.setItem('cards', JSON.stringify(updated));
    setNewCard(defaultCard);
    setSelectedCardIndex(null);
    setGeneralError('');
  };

  const deleteCard = idx => {
    if (!window.confirm('Delete this card?')) return;
    const updated = cards.filter((_, i) => i !== idx);
    setCards(updated);
    localStorage.setItem('cards', JSON.stringify(updated));
    if (selectedCardIndex === idx) {
      setSelectedCardIndex(null);
      setNewCard(defaultCard);
    }
  };

  // Password validation
  const handlePasswordChange = e => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPasswordError('');
    setGeneralError('');
  };
  const validatePassword = () => {
    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Save all settings
  const handleSave = () => {
    if (!validateProfile() || !validatePassword()) return;
    try {
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('addresses', JSON.stringify(addresses));
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem('notifications', JSON.stringify(notifications));
      localStorage.setItem('language', language);
      setPasswords({ newPassword:'', confirmPassword:'' });
      setGeneralError('');
      alert('✅ Settings saved!');
    } catch (err) {
      console.error(err);
      setGeneralError('Failed to save settings');
    }
  };

  const handleDeleteAccount = () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      const userEmail = Cookies.get('user');
      if (userEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        localStorage.setItem('users', JSON.stringify(users.filter(u => u.email !== userEmail)));
      }
      ['profile','addresses','cards','notifications','language','orders','userPoints','basket'].forEach(k => localStorage.removeItem(k));
      Cookies.remove('user');
      alert('Account deleted');
      navigate('/');
    } catch (err) {
      console.error(err);
      setGeneralError('Failed to delete account');
    }
  };

  return (
    <div style={{ background: '#2c2c2c', minHeight: '100vh', color: '#f5f5f5' }}>
      <NavbarRes />
      <main className="container py-5">
        <h1 style={{ textAlign:'center', color:'#FFD700', fontSize:'3rem', marginBottom:'3rem', textShadow:'0 0 20px #FFD700' }}>⚙️ Settings</h1>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'2rem' }}>

          {/* Profile */}
          <Card title="Profile">
            {Object.keys(defaultProfile).map(f => (
              <Input
                key={f}
                label={f.charAt(0).toUpperCase() + f.slice(1)}
                name={f}
                value={profile[f]}
                onChange={handleProfileChange}
                style={inputStyle}
                error={profileErrors[f]}
              />
            ))}
          </Card>

          {/* Addresses */}
          <Card title="Addresses">
            <h4 style={{ color:'#FFD700', marginBottom:'1rem' }}>Saved Addresses</h4>
            {addresses.length === 0 ? (
              <div style={{ padding:'1rem', border:'2px dashed #555', borderRadius:'0.6rem', textAlign:'center', color:'#ccc' }}>
                No saved addresses. Add one below.
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:'1rem' }}>
                {addresses.map((addr, idx) => (
                  <div key={idx} style={{
                    padding:'1rem', borderRadius:'0.7rem',
                    backgroundColor: selectedAddressIndex===idx?'#343434':'#2a2a2a',
                    border: selectedAddressIndex===idx?'2px solid #FFD700':'1px solid #555',
                    boxShadow:'0 5px 15px rgba(0,0,0,0.4)',
                    cursor:'pointer'
                  }}>
                    <p onClick={() => handleSelectAddress(idx)}>{Object.values(addr).filter(v => v && v.trim() !== '').join(', ')}</p>
                    <button style={{...btnStyleRed, marginTop:'0.5rem'}} onClick={()=>deleteAddress(idx)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
            <h4 style={{ color:'#FFD700', marginTop:'1rem' }}>Add / Update Address</h4>
            {['building','area','city','county','country','postalCode'].map(f => (
              <Input
                key={f}
                label={f.charAt(0).toUpperCase()+f.slice(1)}
                value={newAddress[f]}
                onChange={(e)=>handleNewAddressChange(f,e.target.value)}
                style={inputStyle}
                error={addressErrors[f]}
              />
            ))}
            <button onClick={addOrUpdateAddress} style={btnStyleGold}>{selectedAddressIndex!==null?'Update Address':'Add Address'}</button>
          </Card>

          {/* Cards */}
          <Card title="Payment Cards">
            <h4 style={{ color:'#FFD700', marginBottom:'1rem' }}>Saved Cards</h4>
            {cards.length === 0 ? (
              <div style={{ padding:'1rem', border:'2px dashed #555', borderRadius:'0.6rem', textAlign:'center', color:'#ccc' }}>
                No saved cards. Add one below.
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:'1rem' }}>
                {cards.map((card, idx) => (
                  <div key={idx} style={{
                    padding:'1rem', borderRadius:'0.7rem',
                    backgroundColor: selectedCardIndex===idx?'#343434':'#2a2a2a',
                    border: selectedCardIndex===idx?'2px solid #FFD700':'1px solid #555',
                    boxShadow:'0 5px 15px rgba(0,0,0,0.4)',
                    cursor:'pointer'
                  }}>
                    <p onClick={()=>handleSelectCard(idx)}>**** **** **** {card.number.slice(-4)}</p>
                    <p>{card.name}</p>
                    <p>{card.expiry}</p>
                    <button style={{...btnStyleRed, marginTop:'0.5rem'}} onClick={()=>deleteCard(idx)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
            <h4 style={{ color:'#FFD700', marginTop:'1rem' }}>Add / Update Card</h4>
            <Input label="Card Number" value={newCard.number} onChange={e=>handleNewCardChange('number', e.target.value)} style={inputStyle} error={cardErrors.number}/>
            <Input label="Card Holder Name" value={newCard.name} onChange={e=>handleNewCardChange('name', e.target.value)} style={inputStyle} error={cardErrors.name}/>
            <Input label="Expiry (MM/YY)" value={newCard.expiry} onChange={e=>handleNewCardChange('expiry', e.target.value)} style={inputStyle} error={cardErrors.expiry}/>
            <Input label="CVV" type="password" value={newCard.cvv} onChange={e=>handleNewCardChange('cvv', e.target.value)} style={inputStyle} error={cardErrors.cvv}/>
            <button onClick={addOrUpdateCard} style={btnStyleGold}>{selectedCardIndex!==null?'Update Card':'Add Card'}</button>
          </Card>

          {/* Notifications */}
          <Card title="Notifications">
            <label style={{ marginRight:'1rem' }}>
              <input type="checkbox" name="emailNotifications" checked={notifications.emailNotifications} onChange={e=>setNotifications(prev=>({...prev,emailNotifications:e.target.checked}))} /> Email
            </label>
            <label>
              <input type="checkbox" name="smsNotifications" checked={notifications.smsNotifications} onChange={e=>setNotifications(prev=>({...prev,smsNotifications:e.target.checked}))} /> SMS
            </label>
          </Card>

          {/* Language */}
          <Card title="Language">
            <select value={language} onChange={e=>setLanguage(e.target.value)} style={inputStyle}>
              <option>English</option><option>Arabic</option><option>Hindi</option><option>French</option>
            </select>
          </Card>

          {/* Password */}
          <Card title="Change Password">
            <Input label="New Password" name="newPassword" type="password" value={passwords.newPassword} onChange={handlePasswordChange} style={inputStyle} error={passwordError}/>
            <Input label="Confirm Password" name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={handlePasswordChange} style={inputStyle}/>
          </Card>

        </div>

        {generalError && <div className="alert alert-danger text-center py-2">{generalError}</div>}

        <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap', marginTop:'3rem' }}>
          <button onClick={handleSave} style={btnStyleGold}>Save Settings</button>
          <button onClick={handleDeleteAccount} style={btnStyleRed}>🗑️ Delete Account</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SettingsRes;
