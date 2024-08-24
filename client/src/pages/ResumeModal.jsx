import React from 'react';

const ResumeModal = ({ imageUrl, onClose }) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Resume Preview</h2>
          <span
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose} 
          >
            &times;
          </span>
        </div>

        <div className="overflow-auto h-96 border border-gray-300 flex justify-center items-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Resume Preview" className="max-h-full" />
          ) : (
            <p className="text-gray-500">No resume uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
