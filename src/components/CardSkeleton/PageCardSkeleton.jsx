import React from 'react';

const PageCardSkeleton = () => {
  return (
    <section className='w-full items-center text-center m-h-[450px]' style={{ textAlign: '-webkit-center' }}>
      <div className="p-6 bg-white mb-64 max-w-3xl items-center text-center self-center animate-pulse">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Skeleton for image */}
          <div className="w-full md:w-1/2">
            <div className="rounded-xl shadow-lg w-full bg-gray-200" style={{ height: "350px" }}></div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
            {/* Skeleton for title */}
            <div className="w-3/4 h-6 bg-gray-200 mb-4 mx-auto md:mx-0"></div>
            {/* Skeleton for text */}
            <div className="h-4 bg-gray-200 mb-4 mx-auto md:mx-0"></div>
            <div className="h-4 bg-gray-200 mb-4 mx-auto md:mx-0"></div>
            {/* Skeleton for buttons */}
            <div className="flex flex-wrap items-center justify-center mt-6 space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
              <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageCardSkeleton;
