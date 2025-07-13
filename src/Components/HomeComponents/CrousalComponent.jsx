// components/Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import Card from '../Cards/NewUserCard';

const Carousel = ({
  items,
  autoRotate = true,
  rotateInterval = 1000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const intervalRef = useRef(null);

  const getVisibleCards = () => {
    const visibleCards = [];
    const itemCount = items.length;

    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + itemCount) % itemCount;
      visibleCards.push(items[index]);
    }

    return visibleCards;
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (difference > 50) goToNext();
    else if (difference < -50) goToPrev();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, rotateInterval);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const visibleCards = getVisibleCards();

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8  text-gray-800 dark:text-gray-100">
      <div
        className="relative h-96"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleCards.map((card, idx) => {
          let positionClass = '';
          if (idx === 0) positionClass = 'left-0 -translate-x-1/2 scale-90 opacity-80 z-10';
          if (idx === 1) positionClass = 'left-1/2 -translate-x-1/2 scale-100 z-20';
          if (idx === 2) positionClass = 'left-full -translate-x-1/2 scale-90 opacity-80 z-10';

          return (
            <div
              key={`${card?.id}-${idx}`}
              className={`absolute w-80 transition-all duration-500 ${positionClass}`}
            >
              <Card
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                backgroundColor={card.backgroundColor}
                textColor={card.textColor}
              />
            </div>
          );
        })}
      </div>

      {/*here is the Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-full shadow-md z-30 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
        aria-label="Previous card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-full shadow-md z-30 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
        aria-label="Next card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators that show how many slides I have */}
      <div className="flex justify-center sm:mt-6 mt-0 space-x-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (currentIndex !== idx) {
                setIsTransitioning(true);
                setCurrentIndex(idx);
              }
            }}
            className={`w-3 h-3 rounded-full transition-colors
              ${currentIndex === idx
                ? 'bg-red-600 dark:bg-red-600'
                : 'bg-gray-300 dark:bg-gray-500'}`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
