import React from "react";

export const PostLoadingSkeleton: React.FC = () => {
  return (
    <div className="items-start grid gap-5 mx-auto justify-items-start font-poppins my-7 sm:flex ">
      <div className="w-[280px] sm:max-w-72 max-h-64 overflow-hidden animate-pulse">
        <div className="bg-gray-300 h-64 w-[280px] sm:max-w-72"></div>
      </div>
      <div className="w-[280px] lg:w-[600px]">
        <div className="bg-gray-300 h-6 w-2/3 mb-2 animate-pulse"></div>
        <div className="bg-gray-300 h-16 w-full mb-2 animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-2/3 mb-1 animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-1/2 mb-1 animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
};
