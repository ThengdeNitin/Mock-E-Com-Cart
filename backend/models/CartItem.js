const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
qty: { type: Number, default: 1 },
price: Number,
userId: { type: String, default: 'guest' }
});
module.exports = mongoose.model('CartItem', CartItemSchema);