"use client";

import { useState } from "react";
import Image from "next/image";

interface Service {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
}

const allServices: Service[] = [
  {
    id: 1,
    name: "Home Cleaning",
    image: "/services/cleaning.png",
    price: 2000,
    rating: 4.5,
    location: "Islamabad",
  },
  {
    id: 2,
    name: "Plumbing",
    image: "/services/plumber.png",
    price: 1500,
    rating: 4.2,
    location: "Rawalpindi",
  },
  {
    id: 3,
    name: "Electrician",
    image: "/services/electrician.png",
    price: 1800,
    rating: 4.7,
    location: "Lahore",
  },
  {
    id: 4,
    name: "AC Repair",
    image: "/services/ac_repair.png",
    price: 2500,
    rating: 4.9,
    location: "Karachi",
  },
  {
    id: 5,
    name: "Painting",
    image: "/services/painting.png",
    price: 3000,
    rating: 4.3,
    location: "Islamabad",
  },
];

export default function ServicesPage() {
  const [searchName, setSearchName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [rating, setRating] = useState(0);

  // FILTER LOGIC
  const filteredServices = allServices.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (location ? s.location === location : true) &&
      s.price <= priceRange &&
      s.rating >= rating
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Find the Best Home Services
      </h1>

      {/* FILTERS SECTION */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Search by Name */}
          <div>
            <label className="font-semibold text-gray-700">Search Service</label>
            <input
              type="text"
              placeholder="Cleaning, AC Repair..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>

          {/* Location Filter */}
          <div>
            <label className="font-semibold text-gray-700">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="font-semibold text-gray-700">
              Price Range (Up to Rs {priceRange})
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="font-semibold text-gray-700">Minimum Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full mt-2 p-2 border rounded-lg"
            >
              <option value={0}>All</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>

        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filteredServices.length === 0 ? (  
          <p className="text-center text-gray-600 col-span-full">
            No services match your filters.
          </p>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-xl p-4 bo   rder hover:shadow-xl transition cursor-pointer"
            >
              <div className="w-full h-40 relative mb-4">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
              <p className="text-gray-600">{service.location}</p>

              {/* Rating */}
              <p className="text-yellow-500 font-semibold mt-1">
                ⭐ {service.rating}
              </p>

              {/* Price */}
              <p className="text-lg font-bold text-teal-600 mt-2">
                Rs {service.price}
              </p>

              <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                Book Now
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
