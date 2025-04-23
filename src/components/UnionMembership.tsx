import React from 'react';
import { Union } from '../types/union';

interface UnionMembershipProps {
  union: Union;
  onLeave?: (id: number) => void;
}

const UnionMembership: React.FC<UnionMembershipProps> = ({ union, onLeave }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{union.name}</h2>
        {onLeave && (
          <button
            onClick={() => onLeave(union.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            خروج از اتحادیه
          </button>
        )}
      </div>
      <p className="text-gray-600">{union.description}</p>
      <p className="text-gray-600">{union.members} عضو</p>
      <p className="text-gray-600">تاریخ تاسیس: {union.establishedDate}</p>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">مزایای عضویت</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>تخفیف‌های ویژه</li>
          <li>دوره‌های آموزشی</li>
          <li>مشاوره تخصصی</li>
        </ul>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600">وضعیت عضویت: فعال</p>
        <p className="text-gray-600">تاریخ عضویت: 1402/01/01</p>
      </div>
    </div>
  );
};

export default UnionMembership; 