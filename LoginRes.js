import React, { useState } from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginRes() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert('Invalid email or password. Please register first.');
      return;
    }

    // Save login session
    localStorage.setItem('loggedInUser', foundUser.email); // used by NavbarRes
    localStorage.setItem('profile', JSON.stringify(foundUser)); // for SettingsRes
    Cookies.set('user', foundUser.email, { path: '/' });

    alert('Login successful!');
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} is coming soon!`);
  };

  return (
    <>
      <style>{`
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        .app-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
        .content-wrapper { flex: 1; }
        .social-login-btn {
          cursor: pointer; border-radius: 50px; width: 45px; height: 45px;
          font-size: 22px; display: inline-flex; justify-content: center;
          align-items: center; color: white; margin: 0 10px;
          transition: transform 0.2s ease-in-out;
        }
        .social-login-btn:hover { transform: scale(1.1); }
        .google-btn { background: #db4437; }
        .facebook-btn { background: #1877f2; }
        .instagram-btn { background: #e4405f; }
      `}</style>

      <div className="app-wrapper">
        <NavbarRes />
        <div className="content-wrapper">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow-lg rounded-lg p-4">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4 text-dark">Login</h2>
                    <form onSubmit={handleLogin}>
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
                      <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-warning btn-lg rounded-pill">Login</button>
                      </div>
                    </form>

                    <div className="text-center mb-3">Or login with</div>
                    <div className="d-flex justify-content-center mb-4">
                      <div className="social-login-btn google-btn" onClick={() => handleSocialLogin('Google')}>
                        <i className="bi bi-google"></i>
                      </div>
                      <div className="social-login-btn facebook-btn" onClick={() => handleSocialLogin('Facebook')}>
                        <i className="bi bi-facebook"></i>
                      </div>
                      <div className="social-login-btn instagram-btn" onClick={() => handleSocialLogin('Instagram')}>
                        <i className="bi bi-instagram"></i>
                      </div>
                    </div>

                    <p className="text-center mt-3 mb-0">
                      Don’t have an account? <a href="/register" className="text-warning fw-bold">Register here</a>
                    </p>
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

export default LoginRes;
