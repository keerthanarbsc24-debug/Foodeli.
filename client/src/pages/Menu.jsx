
import { useEffect, useState } from "react";

function Menu({ addToCart }) {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch food items");
        }
        return response.json();
      })
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Unable to load food items. Please check your backend server."
        );
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Burger", "Pizza", "Snacks", "Dessert"];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="menu-page">
      <section className="menu-heading">
        <p className="eyebrow">FRESH • TASTY • MADE FOR YOU</p>
        <h1>Explore Our Menu</h1>
        <p>Discover delicious meals made to brighten your day.</p>
      </section>

      <section className="menu-controls">
        <input
          type="text"
          className="food-search"
          placeholder="Search your favourite food..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category-button selected"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <p className="menu-message">Loading delicious food...</p>
      )}

      {error && (
        <p className="menu-message error-message">{error}</p>
      )}

      {!loading && !error && (
        <section className="food-grid menu-food-grid">
          {filteredFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <img
                src={food.image}
                alt={food.name}
                className="food-image"
              />

              <div className="food-info">
                <span className="food-category">{food.category}</span>
                <h3>{food.name}</h3>

                <div className="food-card-bottom">
                  <strong>₹{food.price}</strong>

                  <button
                    className="add-button"
                    onClick={() => addToCart(food)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {!loading && !error && filteredFoods.length === 0 && (
        <p className="menu-message">
          No food items found. Try another search or category.
        </p>
      )}
    </main>
  );
}

export default Menu;