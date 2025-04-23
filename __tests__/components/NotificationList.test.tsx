import { fireEvent, render, screen } from '@testing-library/react';

import NotificationList from '../../src/components/NotificationList';
import { Notification } from '../../src/types/notification';

describe('NotificationList Component', () => {
  const mockNotifications: Notification[] = [
    {
      id: 1,
      title: 'پیام جدید',
      message: 'شما یک پیام جدید دارید',
      type: 'message',
      read: false,
      timestamp: '1402/01/01 12:00',
    },
    {
      id: 2,
      title: 'به‌روزرسانی',
      message: 'سیستم به‌روزرسانی شد',
      type: 'system',
      read: true,
      timestamp: '1402/01/01 11:00',
    },
  ];

  it('renders list of notifications correctly', () => {
    render(<NotificationList notifications={mockNotifications} />);

    expect(screen.getByText('پیام جدید')).toBeInTheDocument();
    expect(screen.getByText('به‌روزرسانی')).toBeInTheDocument();
    expect(screen.getByText('شما یک پیام جدید دارید')).toBeInTheDocument();
    expect(screen.getByText('سیستم به‌روزرسانی شد')).toBeInTheDocument();
  });

  it('marks notification as read when clicked', () => {
    const mockOnMarkAsRead = jest.fn();
    render(
      <NotificationList
        notifications={mockNotifications}
        onMarkAsRead={mockOnMarkAsRead}
      />
    );

    const notification = screen.getByText('پیام جدید').closest('div');
    fireEvent.click(notification!);

    expect(mockOnMarkAsRead).toHaveBeenCalledWith(mockNotifications[0].id);
  });

  it('shows unread notifications count', () => {
    render(<NotificationList notifications={mockNotifications} />);

    expect(screen.getByText('1 پیام خوانده نشده')).toBeInTheDocument();
  });

  it('filters notifications by type', () => {
    render(<NotificationList notifications={mockNotifications} />);

    const filterButton = screen.getByText('پیام‌ها');
    fireEvent.click(filterButton);

    expect(screen.getByText('پیام جدید')).toBeInTheDocument();
    expect(screen.queryByText('به‌روزرسانی')).not.toBeInTheDocument();
  });
});
