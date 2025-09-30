import React from 'react';
import NavbarRes from './NavbarRes';
import Hero from './Hero';
import Services from './Services';
import Cardpage from './Cardpage';
import Footer from './Footer';

function Homepage() {
  return (
    <>
      <NavbarRes />
      <Hero />
      <Services />

      {/* Golden divider line */}
      <div
        style={{
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #ffc107, transparent)',
          margin: '4rem 0',
          borderRadius: '2px',
        }}
      ></div>

      <Cardpage />
      <Footer />
    </>
  );
}

export default Homepage;
