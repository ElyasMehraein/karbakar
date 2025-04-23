import React from 'react';

import { Union } from '../types/union';

interface UnionListProps {
  unions: Union[];
  onJoin?: (unionId: number) => void;
}

const UnionList: React.FC<UnionListProps> = ({ unions, onJoin }) => {
  return (
    <div className="space-y-4">
      {unions.map((union) => (
        <div key={union.id} className="p-4 border rounded-lg">
          <h3 className="text-lg font-bold">{union.name}</h3>
          <p className="text-gray-600">{union.description}</p>
          <p className="text-sm">{union.members} عضو</p>
          <p className="text-sm">تاسیس: {union.establishedDate}</p>
          {onJoin && (
            <button
              onClick={() => onJoin(union.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              عضویت
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UnionList;
