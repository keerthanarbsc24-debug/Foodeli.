
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AboutContact from "./pages/AboutContact";
import SignIn from "./pages/SignIn";

function PageNotFound() {
  return (
    <main className="page-shell">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Require sign-in before adding food to the cart
  function addToCart(food) {
    if (!isSignedIn) {
      alert("Please sign in before adding food to your cart.");
      navigate("/signin");
      return;
    }

    setCart((currentCart) => {
      const existingFood = currentCart.find(
        (item) => item.id === food.id
      );

      if (existingFood) {
        return currentCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...food, quantity: 1 }];
    });

    alert(`${food.name} added to cart!`);
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Menu Page - browsing is allowed without sign-in */}
        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} />}
        />

        {/* Cart Page - sign-in required */}
        <Route
          path="/cart"
          element={
            isSignedIn ? (
              <Cart cart={cart} setCart={setCart} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Orders Page - sign-in required */}
        <Route
          path="/orders"
          element={
            isSignedIn ? (
              <Orders />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* About & Contact Page */}
        <Route path="/about" element={<AboutContact />} />

        {/* Sign In Page */}
        <Route
          path="/signin"
          element={
            isSignedIn ? (
              <Navigate to="/menu" replace />
            ) : (
              <SignIn
                onSignIn={() => {
                  setIsSignedIn(true);
                  navigate("/menu");
                }}
              />
            )
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;