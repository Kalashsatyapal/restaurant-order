'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('/api/dishes')
      .then((res) => res.json())
      .then(setDishes);
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.categoryId === selectedCategory)
    : dishes;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <select
        className="mb-4 p-2 border"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="border p-4 rounded">
            <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="font-bold">${dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
