"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tag, MapPin, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  price_bargain: string;
  city_name: string;
  image: string;
}

type ServiceCardProps = {
  service: Service;
};

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-400 text-yellow-400 opacity-50"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };
    return (
                
            <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl overflow-hidden h-full flex flex-col"
        >
    <Link href={`/services/${service.id}`} className="block flex-1 flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
                src={service.image}
                alt={service.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
            {/* Title & Description */}
            <div className="flex-1 min-h-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                    {service.description}
                </p>
            </div>
            
            {/* Location */}
            <div className="flex items-center mb-2">
                <MapPin size={16} className="text-blue-600" />
                <span className="ml-2 text-sm text-gray-600 font-medium line-clamp-1">
                    {service.city_name}
                </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
                <StarRating rating={service.rating} />
                <span className="ml-2 text-sm text-gray-600 font-medium">
                    {service.rating}
                </span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-lg">
                        Rs {service.price.toLocaleString()}
                    </span>
                    <Tag size={18} className="text-green-500" />
                    <span className="text-green-600 text-xs font-medium">
                        {service.price_bargain}
                    </span>
                </div>
            </div>
        </div>
    </Link>
</motion.div>

);
}

export default ServiceCard;