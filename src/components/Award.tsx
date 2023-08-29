import React from 'react';

const AwardCard = ({ award }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <img
        className="w-full h-20 object-cover rounded-t-lg"
        src={'http://localhost:8000/public/uploads/' + award.image}
        alt={award.description}
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{award.type}</h3>
        <p className="text-gray-600">Points: {award.point}</p>
      </div>
    </div>
  );
};

export default AwardCard;
