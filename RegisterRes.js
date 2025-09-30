import React, { useState } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function RegisterRes() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Get existing users or create empty array
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Check if email already exists
    if (registeredUsers.some((user) => user.email === email)) {
      alert('This email is already registered. Please login.');
      return;
    }

    // Add new user
    const newUser = { email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    alert('Registered Successfully!');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        .app-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
        .content-wrapper { flex: 1; }
      `}</style>

      <div className="app-wrapper">
        <NavbarRes />
        <div className="content-wrapper">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow-lg rounded-lg p-4">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4 text-dark">Register</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control rounded-pill"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control rounded-pill"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control rounded-pill"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-warning btn-lg rounded-pill">Register</button>
                      </div>
                      <p className="text-center mt-3 mb-0">
                        Already have an account? <a href="/login" className="text-warning fw-bold">Login here</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RegisterRes;
