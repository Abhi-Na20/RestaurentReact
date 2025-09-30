import React from 'react';
import NavbarRes from './NavbarRes';
import Footer from './Footer';

function Menupage() {
  const menu = [
    {
      title: "Appetizers",
      icon: "bi-egg-fried",
      items: [
        ["Crispy Calamari", "35.00"],
        ["Garlic Parmesan Fries", "25.00"],
        ["Bruschetta", "30.00"],
        ["Mozzarella Sticks", "28.00"],
        ["Spicy Edamame", "20.00"],
        ["Onion Rings", "22.00"],
        ["Spring Rolls (Veg/Chicken)", "28.50"],
        ["Shrimp Cocktail", "40.00"],
      ]
    },
    {
      title: "Main Courses",
      icon: "bi-emoji-sunglasses",
      items: [
        ["Signature Beef Burger", "45.00"],
        ["Grilled Salmon", "75.00"],
        ["Chicken Alfredo Pasta", "60.00"],
        ["Vegetarian Pizza", "55.00"],
        ["Ribeye Steak", "110.00"],
        ["Shrimp Scampi", "68.00"],
        ["Mushroom Risotto", "50.00"],
        ["Lamb Chops", "120.00"],
        ["Vegan Buddha Bowl", "48.00"],
      ]
    },
    {
      title: "Desserts",
      icon: "bi-cupcake",
      items: [
        ["Chocolate Lava Cake", "30.00"],
        ["New York Cheesecake", "28.00"],
        ["Tiramisu", "29.00"],
        ["Apple Crumble", "26.00"],
        ["Gelato Assortment", "24.00"],
        ["Key Lime Pie", "27.00"],
      ]
    },
    {
      title: "Drinks",
      icon: "bi-cup-straw",
      items: [
        ["Fresh Orange Juice", "18.00"],
        ["Espresso", "12.00"],
        ["Sparkling Water", "15.00"],
        ["Iced Tea", "10.00"],
        ["Cappuccino", "16.00"],
        ["Mojito (Non-alcoholic)", "20.00"],
        ["Fresh Lemonade", "15.00"],
      ]
    }
  ];

  const addToBasket = (name, price) => {
    const qty = parseInt(document.getElementById(`${name}-qty`).value);
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    const existing = basket.find(item => item.name === name);

    if (existing) {
      existing.qty += qty;
    } else {
      basket.push({ name, qty, price: parseFloat(price) });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    alert(`${name} added to basket`);
  };

  return (
    <>
      <NavbarRes />

      {/* Hero Banner */}
      <div className="menu-hero d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="menu-hero-title text-warning fw-bold">Our Delicious Menu</h1>
        <p className="menu-hero-subtitle text-light fst-italic">
          Explore a world of flavors crafted with the freshest ingredients and culinary passion.
        </p>
      </div>

      <div className="container my-5">
        {menu.map((section, index) => (
          <section key={index} className="mb-5">
            <header className="d-flex align-items-center mb-4 section-header">
              <i className={`bi ${section.icon} fs-3 text-warning me-3 icon-spin`}></i>
              <h2 className="section-title fw-bold text-light">{section.title}</h2>
              <div className="gold-underline ms-3"></div>
            </header>

            <div className="row g-4">
              {section.items.map(([name, price], i) => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={i}>
                  <div className="card shadow-sm rounded-4 h-100 menu-card hover-shadow bg-secondary bg-opacity-25 border-0">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title text-capitalize fw-semibold text-light">{name}</h5>
                        <p className="text-warning fs-6">Dhs {price}</p>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-3">
                        <select
                          id={`${name}-qty`}
                          className="form-select form-select-sm w-auto shadow-sm"
                          defaultValue="1"
                        >
                          {[...Array(10)].map((_, n) => (
                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                          ))}
                        </select>
                        <button
                          className="btn btn-warning text-dark rounded-pill fw-semibold px-3 py-2 shadow-sm btn-scale"
                          onClick={() => addToBasket(name, price)}
                        >
                          <i className="bi bi-basket me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />

      <style jsx>{`
        body {
          background-color: #1e1e1e;
          color: #ccc;
        }

        .menu-hero {
          height: 280px;
          background: linear-gradient(135deg, #4b4b4b 0%, #2f2f2f 100%);
          box-shadow: 0 8px 30px rgb(255 193 7 / 0.6);
          margin-bottom: 2rem;
          border-radius: 0 0 2.5rem 2.5rem;
        }

        .menu-hero-title {
          font-size: 3.8rem;
          letter-spacing: 0.15em;
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
          color: #f9c74f;
        }

        .menu-hero-subtitle {
          font-size: 1.4rem;
          max-width: 550px;
          color: #d6c384;
          text-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
        }

        .section-header {
          position: relative;
        }

        .section-title {
          font-size: 2rem;
          position: relative;
          z-index: 1;
        }

        .gold-underline {
          flex-grow: 1;
          height: 4px;
          background: #ffc107;
          border-radius: 2px;
          margin-left: 1rem;
          box-shadow: 0 2px 8px #ffc107aa;
          filter: drop-shadow(0 0 3px #ffc107aa);
        }

        .icon-spin {
          animation: spin 6s linear infinite;
        }

        .hover-shadow:hover {
          box-shadow: 0 0 20px 4px rgba(255, 193, 7, 0.6) !important;
          transform: translateY(-6px) scale(1.03);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-scale:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
          box-shadow: 0 8px 20px rgba(255, 193, 7, 0.7);
        }

        select.form-select-sm {
          border-radius: 1.25rem;
          border: 1.5px solid #ffc107;
          box-shadow: 0 2px 6px rgb(255 193 7 / 0.3);
          transition: all 0.25s ease;
          background-color: #2b2b2b;
          color: #fff;
        }

        select.form-select-sm:focus {
          border-color: #ffca28;
          box-shadow: 0 0 8px #ffca28;
          outline: none;
          background-color: #2b2b2b;
          color: #fff;
        }

        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }

        @media (max-width: 576px) {
          .menu-hero {
            height: 200px;
          }
          .menu-hero-title {
            font-size: 2.5rem;
          }
          .menu-hero-subtitle {
            font-size: 1rem;
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}

export default Menupage;
