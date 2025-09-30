import React from "react";

const chefs = [
  {
    name: "Chef Kim Lee",
    title: "Executive Chef",
    img: "https://cdn.pixabay.com/photo/2022/12/05/09/54/chef-7636393_640.jpg",
    placeholder: "https://placehold.co/640x400/212529/FFFFFF?text=Chef+Kim+Lee",
  },
  {
    name: "Chef Marcus Thorne",
    title: "Master Patissier",
    img: "https://media.istockphoto.com/id/1136638047/photo/i-love-my-work-cheerful-young-chef-in-apron-keeping-tattooed-arms-crossed-and-smiling-while.jpg?s=612x612&w=0&k=20&c=XDfN4eo_AWH_LM7KLNL8jHCQY9wjkVwRBFMNo-z_4C8=",
    placeholder: "https://placehold.co/640x400/212529/FFFFFF?text=Chef+Marcus",
  },
  {
    name: "Chef John Wallace",
    title: "Head Chocolatier",
    img: "https://cdn.pixabay.com/photo/2024/01/20/06/06/ai-generated-8520390_640.png",
    placeholder: "https://placehold.co/640x400/212529/FFFFFF?text=Chef+John",
  },
];

function Cardpage() {
  return (
    <section className="chefs-section py-5">
      <div className="container">
        <h2
          className="text-center display-5 fw-bold mb-5"
          style={{ color: "#ffc107" }}
        >
          ✨ Meet Our <span style={{ color: "#fff3cd" }}>World-Class Chefs</span>
        </h2>

        <div className="row g-5 justify-content-center">
          {chefs.map(({ name, title, img, placeholder }) => (
            <div className="col-12 col-md-6 col-lg-4" key={name}>
              <div className="chef-card text-center p-3 rounded-4">
                <img
                  src={img}
                  alt={name}
                  className="chef-img mb-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                />
                <h5 className="fw-bold mb-1" style={{ color: "#ffc107" }}>
                  {name}
                </h5>
                <p className="fw-semibold" style={{ color: "#f8f9fa", opacity: 0.85 }}>
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* FIX — Make the entire page background match */
        body {
          background-color: #212529 !important;
        }

        .chefs-section {
          background: #212529; /* Deep gray background */
        }

        .chef-card {
          background: #2b3035; /* Slightly lighter background for cards */
          border: 1px solid #ffc107;
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.15);
          transition: all 0.3s ease;
        }

        .chef-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 30px rgba(255, 193, 7, 0.45);
          border-color: #ffca28;
        }

        .chef-img {
          height: 300px;
          width: 100%;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.2);
          transition: box-shadow 0.3s ease;
        }

        .chef-card:hover .chef-img {
          box-shadow: 0 12px 40px rgba(255, 193, 7, 0.35);
        }
      `}</style>
    </section>
  );
}

export default Cardpage;
