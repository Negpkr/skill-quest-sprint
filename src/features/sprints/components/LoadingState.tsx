
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
