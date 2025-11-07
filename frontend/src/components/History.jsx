import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 mt-6">No orders found 😔</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
