import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mb-4"></div>
      <p className="text-amber-200 animate-pulse">Forging your legend...</p>
    </div>
  );
};

export default Loader;