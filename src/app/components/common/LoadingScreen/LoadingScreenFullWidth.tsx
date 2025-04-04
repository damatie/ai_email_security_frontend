'use client';
import React from 'react';

/**
 * LoadingScreenFullWidth component
 *
 * A full-screen loader that displays a modern spinner and a "Loading..." message.
 * This component is designed to cover the entire viewport while your page is loading.
 *
 * @example
 * return (
 *   <div>
 *     {isLoading && <LoadingScreenFullWidth />}
 *     <YourPageContent />
 *   </div>
 * );
 */
const LoadingScreenFullWidth: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      {/* Loading text */}
      <h1 className="mt-4 text-brand-primary text-2xl font-bold animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default LoadingScreenFullWidth;
