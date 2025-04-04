'use client';
import React from 'react';

/**
 * LoadingScreen component
 *
 * A loader that displays a modern spinner and a "Loading..." message.
 * This component is designed to cover the limited viewport while your page is loading.
 *
 * @example
 * return (
 *   <div>
 *     {isLoading && <LoadingScreen />}
 *     <YourPageContent />
 *   </div>
 * );
 */
const LoadingScreen: React.FC = () => {
  return (
    <div className=" absolute w-full top-0 bottom-0 left-0 flex flex-col items-center justify-center ">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      {/* Loading text */}
      <h1 className="mt-4 text-brand-primary text-2xl font-bold animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default LoadingScreen;
