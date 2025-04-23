import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../src/components/Header';
import { User } from '../../src/types/user';

describe('Header Component', () => {
  const mockUser: User = {
    id: 1,
    name: 'کاربر تست',
    email: 'test@example.com',
    role: 'admin'
  };

  it('renders header with user info', () => {
    render(<Header user={mockUser} />);
    
    expect(screen.getByText('کاربر تست')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows navigation menu', () => {
    render(<Header user={mockUser} />);
    
    expect(screen.getByText('داشبورد')).toBeInTheDocument();
    expect(screen.getByText('گزارش‌ها')).toBeInTheDocument();
    expect(screen.getByText('تنظیمات')).toBeInTheDocument();
  });

  it('handles logout', () => {
    const mockOnLogout = jest.fn();
    render(<Header user={mockUser} onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByText('خروج');
    fireEvent.click(logoutButton);
    
    expect(mockOnLogout).toHaveBeenCalled();
  });
}); 