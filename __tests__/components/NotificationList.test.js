import { render, screen, fireEvent } from '@testing-library/react';
import NotificationList from '@/components/NotificationList';

describe('NotificationList Component', () => {
  const mockNotifications = [
    {
      id: 1,
      title: 'صورتحساب جدید',
      message: 'صورتحساب جدید برای شما صادر شده است',
      type: 'invoice',
      read: false,
      createdAt: '2024-02-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'درخواست عضویت',
      message: 'درخواست عضویت در اتحادیه جدید دریافت شد',
      type: 'membership',
      read: true,
      createdAt: '2024-02-19T15:30:00Z'
    }
  ];

  it('renders list of notifications correctly', () => {
    render(<NotificationList notifications={mockNotifications} />);
    
    expect(screen.getByText('صورتحساب جدید')).toBeInTheDocument();
    expect(screen.getByText('درخواست عضویت')).toBeInTheDocument();
  });

  it('marks notifications as read', () => {
    const mockOnMarkAsRead = jest.fn();
    render(<NotificationList notifications={mockNotifications} onMarkAsRead={mockOnMarkAsRead} />);
    
    const markAsReadButton = screen.getByText('علامت‌گذاری به عنوان خوانده شده');
    fireEvent.click(markAsReadButton);
    
    expect(mockOnMarkAsRead).toHaveBeenCalledWith(mockNotifications[0].id);
  });

  it('displays unread notifications with special styling', () => {
    render(<NotificationList notifications={mockNotifications} />);
    
    const unreadNotification = screen.getByText('صورتحساب جدید').closest('div');
    expect(unreadNotification).toHaveClass('unread');
  });

  it('displays empty state when no notifications are available', () => {
    render(<NotificationList notifications={[]} />);
    
    expect(screen.getByText('هیچ نوتیفیکیشنی وجود ندارد')).toBeInTheDocument();
  });

  it('filters notifications by type', () => {
    render(<NotificationList notifications={mockNotifications} selectedType="invoice" />);
    
    expect(screen.getByText('صورتحساب جدید')).toBeInTheDocument();
    expect(screen.queryByText('درخواست عضویت')).not.toBeInTheDocument();
  });

  it('displays notification time correctly', () => {
    render(<NotificationList notifications={mockNotifications} />);
    
    expect(screen.getByText('2 ساعت پیش')).toBeInTheDocument();
    expect(screen.getByText('1 روز پیش')).toBeInTheDocument();
  });

  it('allows deleting notifications', () => {
    const mockOnDelete = jest.fn();
    render(<NotificationList notifications={mockNotifications} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getAllByText('حذف')[0];
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockNotifications[0].id);
  });

  it('displays notification icons based on type', () => {
    render(<NotificationList notifications={mockNotifications} />);
    
    expect(screen.getByTestId('invoice-icon')).toBeInTheDocument();
    expect(screen.getByTestId('membership-icon')).toBeInTheDocument();
  });
}); 