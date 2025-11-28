"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Header from "@/components/shared/header";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/shared/footer";
import ServiceCard from "@/components/customer/service_card";
import ServiceIcons from "@/components/customer/service_icons";
import { Tag, ChevronLeft, ChevronRight, Star } from "lucide-react";
import axios from "axios";
import {UseSwitch} from "@/hooks/userSwitch"
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface ServiceIcon {
  id: number;
  service_name: string;
  icon_url: string;
}
interface ServiceAPI {
  id: number;
  sub_service_name: string;
  description: string;
  price: number;
  price_bargain: string;
  active_status: boolean;
  cover_image_url: string | null;
  service_name: string;
  address: {
    city: string;
  };
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [address, setAddress] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [services, setServices] = useState<Service[]>([]);
  const [icons, setIcons] = useState<ServiceIcon[]>([]);
  const [allServices, setAllServices] = useState<ServiceAPI[]>([]);

 
  useEffect(() => {
    const fetchServices = async () => {
      try {

        const response = await axios.get(
          "http://127.0.0.1:3300/api/v1/services/service_icons"
        );

        // Extract only required fields
        const formatted = response.data.map((item: any) => ({
          id: item.id,
          service_name: item.service_name,
          icon_url: item.icon_url,
        }));

        setIcons(formatted);
        console.log("Success:", formatted);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSubServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://127.0.0.1:3300/api/v1/services/sub_services",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        
        const servicesData = data.sub_services;

        // if (Array.isArray(data)) {
        //   // setServices(data);
        // } else if (Array.isArray((data as any).data)) {
        //   // setServices((data as any).data);
        // }
        setAllServices(servicesData);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchSubServices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerView(1);
      else if (width < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(services.length / itemsPerView);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, totalSlides]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const getTransform = () => {
    return `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
  };

  // Star rating component

  const heroImages = ["/featured_image.png", "/featured_image_2.png"];
  // console.log("token: ",localStorage.getItem("authToken"))
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000); // 10 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16 lg:py-24 gap-12">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1"
    >
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
        Connecting <span className="text-blue-600">Customers</span> with
        Trusted <span className="text-indigo-600">Service Providers</span>
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Find the right experts for your needs or showcase your skills to
        reach thousands of customers. All in one platform.
      </p>
    </motion.div>

    {/* Enhanced Sliding Window */}
    <div className="flex-1 flex justify-center items-center relative">
      <div className="relative w-[600px] h-[520px] overflow-hidden rounded-2xl shadow-2xl bg-white border-2 border-white/20">
        {/* Sliding Container */}
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex h-full"
        >
          {heroImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={image}
                alt={`Service Connection ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Optional: Add overlay text for each slide */}
              {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white text-lg font-semibold">
                  Slide {index + 1} - Amazing Services
                </p>
              </div> */}
            </div>
          ))}
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-white scale-110" 
                  : "bg-transparent hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  </div>
</section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Our Services
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              >
                <ServiceIcons service_icons={icon} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured <span className="text-blue-600">Services</span>
          </h2>

          <div
            style={{ borderRadius: "20px" }}
            className="relative bg-blue-200 p-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {allServices.length > itemsPerView && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110 border border-gray-200"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110 border border-gray-200"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Carousel */}
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: getTransform(),
                  width: `${(allServices.length / itemsPerView) * 100}%`,
                }}
              >
                {allServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0 px-2 sm:px-3"
                    style={{
                      width: `${60 / itemsPerView}%`,
                      minWidth: `${60 / itemsPerView}%`,
                    }}
                  >
                    <ServiceCard
                      service={{
                        id: service.id,
                        name: service.sub_service_name,
                        image: service.cover_image_url || "/placeholder.png",
                        price: service.price,
                        rating: 4.5,
                        description: service.description,
                        price_bargain: service.price_bargain,
                        city_name: service.address.city,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            {totalSlides > 0 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "bg-blue-600 w-8 h-3"
                        : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Professionals",
                desc: "Every service provider is verified to ensure you get top-quality work.",
              },
              {
                title: "Secure Payments",
                desc: "Pay safely through our trusted payment system with full transparency.",
              },
              {
                title: "24/7 Support",
                desc: "Our team is available around the clock to assist you anytime.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl shadow-md border"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
