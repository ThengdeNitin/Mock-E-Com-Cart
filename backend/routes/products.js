const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const count = await Product.countDocuments(); 
    if (count === 0) {
      const seed = [
        { name: "Vibe T-shirt", price: 499, description: "Comfort tee", image: "" },
        { name: "Vibe Hoodie", price: 1299, description: "Cozy hoodie", image: "" },
        { name: "Vibe Cap", price: 299, description: "Stylish cap", image: "" },
        { name: "Vibe Mug", price: 199, description: "Coffee mug", image: "" },
        { name: "Vibe Tote", price: 399, description: "Canvas tote", image: "" },
      ];
      await Product.insertMany(seed);
    }

    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
