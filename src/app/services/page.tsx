"use client";

import { useState } from "react";
import Image from "next/image";
import ServiceCard from "@/components/customer/service_card";
import MapView from "@/components/shared/MapView"
interface Service {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
}

const allServices: Service[] = [
 {
      id: 1,
      name: "Home Cleaning",
      image: "/featured_image.png",
      description: "Professional home cleaning service with eco-friendly products.",
      price: 2500,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Electrician Services",
      image: "/featured_image.png",
      description: "Certified electricians available for repairs and installations.",
      price: 1800,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Plumbing Services",
      image: "/featured_image.png",
      description: "Expert plumbers for all your plumbing needs.",
      price: 2200,
      rating: 4.6,
    },
    {
      id: 4,
      name: "Gardening Services",
      image: "/featured_image.png",
      description: "Professional gardening and lawn care services.",
      price: 1500,
      rating: 4.4,
    },
    {
      id: 5,
      name: "AC Repair",
      image: "/featured_image.png",
      description: "AC maintenance and repair services.",
      price: 3000,
      rating: 4.7,
    },
    {
      id: 6,
      name: "Painting Services",
      image: "/featured_image.png",
      description: "Professional painting for homes and offices.",
      price: 4000,
      rating: 4.9,
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
      className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-xl transition cursor-pointer"
    >
      <ServiceCard service={service} />
    </div>
  ))
)}

 <MapView
        height="500px"
        defaultCenter={[24.8607, 67.0011]} // Karachi
        zoom={12}
        enableClickMarker={true}
      />


      </div>
    </div>
  );
}
