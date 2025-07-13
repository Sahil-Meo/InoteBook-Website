import React, { useEffect, useState } from 'react';

const AutoSlidingCarousel = () => {
  const imageURL = "https://images.stockcake.com/public/6/0/8/608e4426-54cc-4519-861c-e469b4b4df3a_large/focused-office-worker-stockcake.jpg";

  const cards = [
    {
      title: "Accounting Tasks",
      description: "Create a system to keep your books, receipts, and invoices organized.",
      icon: "https://www.notion.so/images/page-cover/accounting.png",
      type: "List"
    },
    {
      title: "Business Travel Packing",
      description: "Never forget your laptop charger, lucky shoes, or passport again.",
      icon: "https://www.notion.so/images/page-cover/travel.png",
      type: "List"
    },
    {
      title: "Client Management",
      description: "Organize your work with clients from the smallest to largest details.",
      icon: "https://www.notion.so/images/page-cover/client-management.png",
      type: "List"
    },
    {
      title: "Deep Work",
      description: "Practice prioritizing focus and eliminating distraction with this template.",
      icon: "https://www.notion.so/images/page-cover/deep-work.png",
      type: "List"
    },
    {
      title: "Meeting Agenda",
      description: "Waste less time in meetings, ensuring they're efficient and action-oriented.",
      icon: "https://www.notion.so/images/page-cover/meeting.png",
      type: "List"
    }
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cards.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalCards]);

  const duplicatedCards = [...cards, ...cards];

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Auto Sliding Carousel
      </h2>

      <div className="relative w-full ">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `100%`,
            transform: `translateX(-${(currentIndex * 100) / 3}%)`,
          }}
        >
          {cards?.map((card, index) => (
            <div key={index} className="min-w-1/3 px-4 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {card.desc}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="inline-block mt-auto text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 dark:hover:bg-blue-500"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoSlidingCarousel;
