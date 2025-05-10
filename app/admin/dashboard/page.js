'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(setOrders);
    fetch('/api/dishes')
      .then((res) => res.json())
      .then(setDishes);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} - Status: {order.status}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Dishes</h2>
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
