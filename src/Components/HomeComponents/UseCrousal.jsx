// pages/HomePage.js
import React from 'react';
import Carousel from './CrousalComponent';

const HomePage = () => {
  const carouselItems = [
    {
      id: 1,
      title: "Accounting Tasks",
      description: "Create a system to keep your books, receipts, and invoices organized.",
      imageUrl: "https://i.pcmag.com/imagery/articles/05dd71UpCGQy9gj9kj7E29h-17..v1715709097.jpg",
      backgroundColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Business Travel Packing",
      description: "Never forget your laptop charger, lucky shoes, or passport again.",
      imageUrl: "https://www.mercantilemountain.com/cdn/shop/files/dspic_a73c7b32-547f-416c-98c1-660057e04dee.jpg?v=1727556208&width=1920",
      backgroundColor: "bg-purple-50",
    },
    {
      id: 3,
      title: "Client Management",
      description: "Organize your work with clients from the smallest to largest details.",
      imageUrl: "https://img.freepik.com/premium-vector/hand-shake-handshake-shaking-hands_212005-130.jpg?w=360",
      backgroundColor: "bg-green-50",
    },
    {
      id: 4,
      title: "Deep Work",
      description: "Practice prioritizing focus and eliminating distraction with this template.",
      imageUrl: "https://apricot.com.pk/cdn/shop/products/Creative-Wooden-Iron-Table-Desk-Lamp-Grey-Apricot-531.jpg?v=1712099874",
      backgroundColor: "bg-yellow-50",
    },
    {
      id: 5,
      title: "Meeting Agenda",
      description: "Waste less time in meetings, ensuring they're efficient and action-oriented.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThx6cZtRHJjTiFexObDgSzytEQuwXz2JK51g&s",
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