const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const Product = require('../models/Product');


router.post('/', async (req, res) => {
try {
const { name, email } = req.body;
const items = await CartItem.find({ userId: 'guest' }).populate('productId', 'name price image').lean();
if (!items.length) return res.status(400).json({ error: 'Cart is empty' });


let total = 0;
const orderItems = items.map(it => {
const price = it.price ?? it.productId.price;
total += price * it.qty;
return { productId: it.productId._id, qty: it.qty, price };
});


const order = await Order.create({ items: orderItems, total, customer: { name, email } });

await CartItem.deleteMany({ userId: 'guest' });


res.json({ success: true, receipt: { orderId: order._id, total: order.total, createdAt: order.createdAt } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;