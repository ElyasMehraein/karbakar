import { render, screen, fireEvent } from '@testing-library/react';
import GuestAccess from '@/components/GuestAccess';

describe('GuestAccess Component', () => {
  const mockBusiness = {
    id: 1,
    name: 'رستوران نمونه',
    description: 'رستوران با غذاهای ایرانی و فرنگی',
    address: 'تهران، خیابان نمونه',
    phone: '02112345678',
    type: 'restaurant',
    services: ['food', 'delivery'],
    workingHours: {
      monday: { open: '09:00', close: '21:00' },
      tuesday: { open: '09:00', close: '21:00' }
    }
  };

  it('renders business information for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('رستوران نمونه')).toBeInTheDocument();
    expect(screen.getByText('رستوران با غذاهای ایرانی و فرنگی')).toBeInTheDocument();
    expect(screen.getByText('تهران، خیابان نمونه')).toBeInTheDocument();
    expect(screen.getByText('02112345678')).toBeInTheDocument();
  });

  it('displays working hours for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('ساعات کاری')).toBeInTheDocument();
    expect(screen.getByText('دوشنبه: 09:00 - 21:00')).toBeInTheDocument();
    expect(screen.getByText('سه‌شنبه: 09:00 - 21:00')).toBeInTheDocument();
  });

  it('displays services for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('خدمات')).toBeInTheDocument();
    expect(screen.getByText('غذا')).toBeInTheDocument();
    expect(screen.getByText('تحویل')).toBeInTheDocument();
  });

  it('shows login prompt for restricted actions', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    const restrictedAction = screen.getByText('برای مشاهده این بخش وارد شوید');
    expect(restrictedAction).toBeInTheDocument();
  });

  it('displays business type correctly', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('نوع کسب و کار: رستوران')).toBeInTheDocument();
  });

  it('shows map location for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByTestId('business-map')).toBeInTheDocument();
  });

  it('displays contact information for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('اطلاعات تماس')).toBeInTheDocument();
    expect(screen.getByText('آدرس: تهران، خیابان نمونه')).toBeInTheDocument();
    expect(screen.getByText('تلفن: 02112345678')).toBeInTheDocument();
  });

  it('shows registration prompt for guests', () => {
    render(<GuestAccess business={mockBusiness} />);
    
    expect(screen.getByText('برای دسترسی به تمام امکانات ثبت نام کنید')).toBeInTheDocument();
    expect(screen.getByText('ثبت نام')).toBeInTheDocument();
  });
}); 