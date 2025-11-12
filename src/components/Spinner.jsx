import React, { useEffect, useState } from 'react';
import { FaCarSide } from 'react-icons/fa';

const Spinner = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        
        <FaCarSide
          className="text-blue-500 text-6xl mb-4"
          style={{ animation: 'spin 3s linear infinite' }}
        />
        <p className="text-white text-lg font-semibold">Loading...</p>

     
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Spinner;


