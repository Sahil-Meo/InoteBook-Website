// pages/HomePage.js
import React from 'react';
import Carousel from './CrousalComponent';

const HomePage = () => {
  const carouselItems = [
    {
      id: 1,
      title: "Feature One",
      description: "This is the first feature card with some description about the service or product.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s",
      backgroundColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Premium Service",
      description: "Our premium service offers exclusive benefits and features for our valued customers.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s",
      backgroundColor: "bg-purple-50",
    },
    {
      id: 3,
      title: "Global Support",
      description: "24/7 support available worldwide with our dedicated team of professionals.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s",
      backgroundColor: "bg-green-50",
    },
    {
      id: 4,
      title: "Innovative Solutions",
      description: "Cutting-edge technology solutions tailored to your business needs.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s",
      backgroundColor: "bg-yellow-50",
    },
    {
      id: 5,
      title: "Secure Platform",
      description: "Enterprise-grade security to protect your data and transactions.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s",
      backgroundColor: "bg-red-50",
    },
  ];


  return (
    <div className="sm:py-12 py-6 ">
      <h2 className="text-3xl font-bold text-center sm:mb-8 mb-4 dark:text-gray-50">Our Features</h2>
      <Carousel
        items={carouselItems}
        autoRotate={true}
        rotateInterval={3000}
      />
    </div>
  );
};

export default HomePage;