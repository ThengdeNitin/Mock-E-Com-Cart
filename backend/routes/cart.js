const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find({ userId: "guest" })
      .populate("productId")
      .lean();

    let total = 0;
    const mapped = items.map((item) => {
      const price = item.price ?? item.productId.price;
      const subtotal = price * item.qty;
      total += subtotal;
      return {
        id: item._id,
        product: item.productId,
        qty: item.qty,
        price,
        subtotal,
      };
    });

    res.json({ items: mapped, total });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty)
      return res.status(400).json({ error: "productId and qty required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let item = await CartItem.findOne({ productId, userId: "guest" });
    if (item) {
      item.qty += qty; 
      await item.save();
    } else {
      item = await CartItem.create({
        productId,
        qty,
        price: product.price,
        userId: "guest",
      });
    }

    res.json({ success: true, item });
  } catch (err) {
    console.error("❌ Error in POST /api/cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === "undefined") {
      return res.status(400).json({ error: "Invalid item ID" });
    }
    await CartItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
