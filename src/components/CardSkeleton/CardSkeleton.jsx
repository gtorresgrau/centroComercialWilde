import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="animate-pulse group relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] bg-white rounded-lg">
      <div className="w-full p-2 h-80 bg-gray-300 rounded-md"></div>
      <div className="p-2 relative bottom-2">
        <div className="w-5/6 sm:w-3/4 mx-auto bg-gray-300 rounded-lg h-6 my-2"></div>
        <div className="bg-gray-300 h-4 rounded-lg mx-auto w-3/4 mb-4"></div>
        <div className="flex justify-center m-2">
          <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
