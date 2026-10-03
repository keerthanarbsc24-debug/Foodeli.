
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


const foods = [
  {
    id: 1,
    name: "Veg Burger",
    price: 120,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 220,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
  },
  {
    id: 3,
    name: "French Fries",
    price: 90,
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 150,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
  },
  {
    id: 5,
    name: "Chicken Burger",
    price: 180,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
  },
  {
    id: 6,
    name: "Veg Sandwich",
    price: 100,
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
  },
];


const orders = [];


app.get("/", (req, res) => {
  res.send("Foodeli backend is running!");
});


app.get("/api/foods", (req, res) => {
  res.json(foods);
});


app.post("/api/foods", (req, res) => {
  const { name, price, category, image } = req.body;

  if (
    !name ||
    price === undefined ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0 ||
    !category
  ) {
    return res.status(400).json({
      message: "Please provide a valid name, price, and category.",
    });
  }

  const newFood = {
    id: Date.now(),
    name,
    price: Number(price),
    category,
    image: image || "",
  };

  foods.push(newFood);

  res.status(201).json({
    message: "Food item added successfully",
    food: newFood,
  });
});


app.put("/api/foods/:id", (req, res) => {
  const foodId = Number(req.params.id);
  const index = foods.findIndex((food) => food.id === foodId);

  if (index === -1) {
    return res.status(404).json({
      message: "Food item not found",
    });
  }

  const { name, price, category, image } = req.body;

  if (
    price !== undefined &&
    (!Number.isFinite(Number(price)) || Number(price) < 0)
  ) {
    return res.status(400).json({
      message: "Please provide a valid price.",
    });
  }

  foods[index] = {
    ...foods[index],
    ...(name !== undefined && { name }),
    ...(price !== undefined && { price: Number(price) }),
    ...(category !== undefined && { category }),
    ...(image !== undefined && { image }),
  };

  res.json({
    message: "Food item updated successfully",
    food: foods[index],
  });
});


app.delete("/api/foods/:id", (req, res) => {
  const foodId = Number(req.params.id);
  const index = foods.findIndex((food) => food.id === foodId);

  if (index === -1) {
    return res.status(404).json({
      message: "Food item not found",
    });
  }

  const deletedFood = foods.splice(index, 1)[0];

  res.json({
    message: "Food item deleted successfully",
    food: deletedFood,
  });
});


app.post("/api/orders", (req, res) => {
  const {
    customerName,
    customerPhone,
    address,
    items,
  } = req.body;

 
  if (
    typeof customerName !== "string" ||
    !customerName.trim() ||
    typeof customerPhone !== "string" ||
    !/^\d{10}$/.test(customerPhone) ||
    typeof address !== "string" ||
    !address.trim() ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      message:
        "Please provide your name, a valid 10-digit phone number, address, and order items.",
    });
  }

 
  let total = 0;

  for (const item of items) {
    const food = foods.find(
      (foodItem) => foodItem.id === Number(item.id)
    );

    const quantity = Number(item.quantity);

    if (
      !food ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        message: "One or more order items are invalid.",
      });
    }

    total += food.price * quantity;
  }

 
  const newOrder = {
    id: Date.now(),
    customerName: customerName.trim(),
    customerPhone,
    address: address.trim(),
    items: items.map((item) => {
      const food = foods.find(
        (foodItem) => foodItem.id === Number(item.id)
      );

      return {
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: Number(item.quantity),
      };
    }),
    total,
    status: "Order Placed",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order placed successfully",
    order: newOrder,
  });
});


app.get("/api/orders", (req, res) => {
  res.json(orders);
});


console.log("FOOD COUNT:", foods.length);
console.log(
  "FOOD NAMES:",
  foods.map((food) => food.name)
);


app.listen(PORT, () => {
  console.log(
    `Foodeli backend running at http://localhost:${PORT}`
  );
});