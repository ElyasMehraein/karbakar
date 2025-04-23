import React from 'react';

import { Notification } from '../types/notification';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (id: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">اعلان‌ها</h2>
        {unreadCount > 0 && (
          <span className="bg-blue-500 text-white px-2 py-1 rounded">
            {unreadCount} پیام خوانده نشده
          </span>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded ${
              notification.read ? 'bg-gray-100' : 'bg-blue-50'
            }`}
            onClick={() => onMarkAsRead?.(notification.id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{notification.title}</h3>
              <span className="text-gray-500 text-sm">
                {notification.timestamp}
              </span>
            </div>
            <p className="text-gray-600">{notification.message}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <button className="px-4 py-2 text-blue-500">همه</button>
        <button className="px-4 py-2 text-blue-500">پیام‌ها</button>
        <button className="px-4 py-2 text-blue-500">سیستم</button>
      </div>
    </div>
  );
};

export default NotificationList;
