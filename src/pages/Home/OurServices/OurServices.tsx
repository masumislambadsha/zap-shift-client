'use client';

import React from 'react';
import { Package, Truck, Home, Building2, RotateCcw, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon, isHighlighted = false }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl p-[] ${
        isHighlighted
          ? 'bg-white text-gray-800'
          : 'bg-white text-gray-800'
      } hover:bg-primary `}
    >
      <div className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 ${
          isHighlighted
            ? 'bg-green-100 group-hover:bg-white/20'
            : 'bg-green-100 group-hover:bg-white/20'
        }`}>
          {React.cloneElement(icon, {
            className: `h-8 w-8 transition-colors duration-300 ${
              isHighlighted
                ? 'text-green-600'
                : 'text-green-600'
            }`
          })}
        </div>

        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
          isHighlighted
            ? 'text-gray-600 '
            : 'text-gray-600 '
        }`}>
          {description}
        </p>
      </div>

      <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 " />
    </div>
  );
};

export default function OurServices() {
  const services = [
    {
      title: 'Express & Standard Delivery',
      description: 'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.',
      icon: <Package />
    },
    {
      title: 'Nationwide Delivery',
      description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
      icon: <Truck />,
      highlighted: true  // Only used to style like others, but starts white
    },
    {
      title: 'Fulfillment Solution',
      description: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
      icon: <Building2 />
    },
    {
      title: 'Cash on Home Delivery',
      description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
      icon: <Home />
    },
    {
      title: 'Corporate Service / Contract in Logistics',
      description: 'Customized corporate services which includes warehouse and inventory management support.',
      icon: <Building2 />
    },
    {
      title: 'Parcel Return',
      description: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
      icon: <RotateCcw />
    }
  ];

  return (
    <section className="bg-secondary py-16 px-4 lg:p-24 rounded-[50px]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-teal-100 max-w-3xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isHighlighted={service.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
