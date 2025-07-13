// components/Card.js
import React from 'react';

const Card = ({
  title,
  description,
  imageUrl,
  backgroundColor = 'bg-white',
  textColor = 'text-gray-800'
}) => {
  return (
    <div
      className={`${backgroundColor} ${textColor} 
        dark:bg-gray-800 dark:text-gray-100 
        rounded-xl shadow-lg overflow-hidden h-full flex flex-col 
        transition-all duration-300 transform hover:scale-105`}
    >
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold mb-3">{title}</h3>
        <p className="sm:text-base text-sm flex-1">{description}</p>
        <button className="mt-4 px-4 py-2 text-sm sm:text-base rounded-md bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors self-start">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;
