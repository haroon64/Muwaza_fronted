"use client";

import React from "react";
import Image from "next/image";

interface ServiceIcons {
  service_name: string;
  icon_url: string;
}

type ServiceIconProps = {
  service_icons: ServiceIcons;
};

const ServiceIcons: React.FC<ServiceIconProps> = ({ service_icons }) => {
  return (
    <div className="flex flex-col items-center w-24">
      
      {/* Image */}
      <div className="w-20 h-20 relative mb-2">
        <Image
          src={service_icons.icon_url}
          alt={service_icons.service_name}
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      {/* Name */}
      <p className="text-black text-center font-medium text-sm md:text-base">
        {service_icons.service_name}
      </p>

    </div>
  );
};

export default ServiceIcons;
