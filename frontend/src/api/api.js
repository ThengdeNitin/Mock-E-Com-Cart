import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE}/products`);
    return res.data || [];
  } catch (err) {
    console.error("❌ Error fetching products:", err.response?.data || err.message);
    return [];
  }
};

export const getCart = async () => {
  try {
    const res = await axios.get(`${API_BASE}/cart`);
    const data = res.data;

    return {
      cartItems: data.items || data.cartItems || [],
      total: data.total || 0,
    };
  } catch (err) {
    console.error("❌ Error fetching cart:", err.response?.data || err.message);
    return { cartItems: [], total: 0 };
  }
};


export const addToCart = async (productId, qty = 1) => {
  try {
    const res = await axios.post(`${API_BASE}/cart`, { productId, qty });
    return res.data;
  } catch (err) {
    console.error("❌ Error adding to cart:", err.response?.data || err.message);
    throw err;
  }
};


export const deleteCartItem = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/cart/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error removing cart item:", err.response?.data || err.message);
    throw err;
  }
};

export const checkout = async (cartItems) => {
  try {
    const res = await axios.post(`${API_BASE}/checkout`, { cartItems });
    return res.data;
  } catch (err) {
    console.error("❌ Error during checkout:", err.response?.data || err.message);
    throw err;
  }
};
