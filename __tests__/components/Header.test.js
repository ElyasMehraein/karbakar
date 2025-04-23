import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('renders logo correctly', () => {
    render(<Header />);
    const logo = screen.getByAltText('Karbakar Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links for authenticated users', () => {
    const mockUser = { name: 'Test User', role: 'business' };
    render(<Header user={mockUser} />);
    
    expect(screen.getByText('داشبورد')).toBeInTheDocument();
    expect(screen.getByText('پروفایل')).toBeInTheDocument();
    expect(screen.getByText('خروج')).toBeInTheDocument();
  });

  it('renders login/register buttons for guests', () => {
    render(<Header />);
    
    expect(screen.getByText('ورود')).toBeInTheDocument();
    expect(screen.getByText('ثبت نام')).toBeInTheDocument();
  });
}); 