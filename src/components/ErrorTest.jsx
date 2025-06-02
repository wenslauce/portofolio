import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ErrorTest = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    // This will trigger the error boundary
    throw new Error('This is a test error');
  }
  
  return (
    <div className="p-6 backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4 text-white">Error Boundary Test</h2>
      <p className="mb-6 text-gray-300">
        Click the button below to trigger an error and test the Error Boundary component.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShouldError(true)}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
      >
        Trigger Error
      </motion.button>
    </div>
  );
};

export default ErrorTest; 