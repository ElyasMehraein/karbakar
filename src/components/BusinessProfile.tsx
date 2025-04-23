import React, { useState } from 'react';
import { Business } from '../types/business';

interface BusinessProfileProps {
    business: Business;
    isOwner?: boolean;
    onSave?: (updatedBusiness: Business) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ business, isOwner = false, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBusiness, setEditedBusiness] = useState<Business>(business);

    const handleSave = () => {
        if (onSave) {
            onSave(editedBusiness);
        }
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedBusiness(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="business-profile">
            <h1>{business.name}</h1>
            <p>{business.description}</p>
            <p>{business.address}</p>
            <p>{business.phone}</p>
            <p>{business.email}</p>
            <p>{business.website}</p>

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editedBusiness.name}
                        onChange={handleChange}
                        aria-label="نام کسب و کار"
                    />
                    <button onClick={handleSave}>ذخیره</button>
                </div>
            ) : (
                isOwner && <button onClick={() => setIsEditing(true)}>ویرایش</button>
            )}

            <h2>ساعات کاری</h2>
            {business.workingHours.map((hours, index) => (
                <p key={index}>
                    {hours.day === 'monday' ? 'دوشنبه' : 'سه‌شنبه'}: {hours.open} - {hours.close}
                </p>
            ))}

            <h2>خدمات</h2>
            <div>
                {business.services.map((service, index) => (
                    <span key={index}>{service} </span>
                ))}
            </div>
        </div>
    );
};

export default BusinessProfile; 