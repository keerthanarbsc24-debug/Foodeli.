
import { Link } from "react-router-dom";

function Home() {
  const popularFoods = [
    {
      id: 1,
      name: "Veg Burger",
      category: "Burger",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
      description: "A delicious burger packed with fresh vegetables.",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
      description: "Classic pizza topped with cheese and fresh herbs.",
    },
    {
      id: 3,
      name: "French Fries",
      category: "Snacks",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
      description: "Crispy golden fries, perfect for any time.",
    },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">GOOD FOOD, GOOD MOOD</p>

          <h1>
            Delicious food,
            <br />
            <span>delivered to you.</span>
          </h1>

          <p className="hero-description">
            Discover your favourite meals, explore exciting flavours,
            and enjoy delicious food delivered fresh to your doorstep.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="primary-button">
              Explore Menu →
            </Link>

            <Link to="/about" className="secondary-button">
              About Foodeli
            </Link>
          </div>

          <div className="hero-note">
            <span>✓ Fresh ingredients</span>
            <span>✓ Made with care</span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
            alt="Freshly prepared pizza"
          />

          <div className="image-badge">
            <span className="badge-icon">✦</span>
            <div>
              <strong>Made with love</strong>
              <p>Fresh food, happy moments</p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</p>
            <h2>Popular Picks</h2>
            <p>
              Your cravings, our favourites. Discover something delicious.
            </p>
          </div>

          <Link to="/menu" className="view-menu-link">
            View Full Menu →
          </Link>
        </div>

        <div className="food-grid">
          {popularFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <img
                src={food.image}
                alt={food.name}
                className="food-image"
              />

              <div className="food-info">
                <span className="food-category">{food.category}</span>
                <h3>{food.name}</h3>
                <p>{food.description}</p>

                <div className="food-card-bottom">
                  <strong>₹{food.price}</strong>

                  <Link to="/menu" className="add-button">
                    Explore →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="student-promo">
        <div className="student-promo-content">
          <p className="eyebrow">MADE FOR YOUR BUSY DAYS</p>

          <h2>Good food, student-friendly prices.</h2>

          <p>
            Between classes, assignments, and projects, enjoy tasty meals
            without making food complicated.
          </p>

          <Link to="/menu" className="primary-button">
            Find Your Meal →
          </Link>
        </div>

        <div className="student-promo-icon" aria-hidden="true">
          <span>🥗</span>
          <span>🍔</span>
          <span>🍕</span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <span className="brand-icon">F</span>
              <span>
                foodeli<span className="brand-dot">.</span>
              </span>
            </Link>

            <p>
              Good food, great moments.
              <br />
              Bringing happiness to your plate.
            </p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/orders">My Orders</Link>
          </div>

          <div className="footer-links">
            <h4>Get to Know Us</h4>
            <Link to="/about">About & Contact</Link>
            <a href="mailto:hello@foodeli.example">Email Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Foodeli. Made with care.</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;