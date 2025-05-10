'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { isSignedIn } = useUser();  // Clerk hook to check if user is signed in
  const router = useRouter();  // Next.js hook to programmatically navigate

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

  const handleAdminDashboardClick = () => {
    if (!isSignedIn) {
      // If the user is not signed in, redirect to Clerk's sign-in page
      router.push('/sign-in');  // Assuming you have a sign-in page in place
    } else {
      // If signed in, navigate to the admin dashboard
      router.push('/admin');
    }
  };

  return (
    <div className="p-4">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Menu</h1>
        <button
          onClick={handleAdminDashboardClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Admin Dashboard
        </button>
      </div>

      {/* Category Filter */}
      <select
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Dish Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="border p-4 rounded shadow bg-white">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{dish.name}</h2>
            <p className="text-gray-600">{dish.description}</p>
            <p className="font-bold mt-2">${dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
