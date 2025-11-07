const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name price image") 
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


module.exports = router;
