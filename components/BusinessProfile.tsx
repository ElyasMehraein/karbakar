import React from 'react';
import { Business } from '../types/business';

interface BusinessProfileProps {
  business: Business;
  isOwner?: boolean;
  onSave?: (business: Business) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ business, isOwner, onSave }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{business.name}</h2>
      <p className="text-gray-600">{business.description}</p>
      <p className="mt-2">{business.address}</p>
      <p>{business.phone}</p>
      {isOwner && onSave && (
        <button
          onClick={() => onSave(business)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          ویرایش
        </button>
      )}
    </div>
  );
};

export default BusinessProfile; 