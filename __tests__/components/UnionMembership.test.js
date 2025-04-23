import { render, screen, fireEvent } from '@testing-library/react';
import UnionMembership from '@/components/UnionMembership';

describe('UnionMembership Component', () => {
  const mockUnion = {
    id: 1,
    name: 'اتحادیه رستوران‌داران',
    description: 'اتحادیه رسمی رستوران‌های تهران',
    members: 150,
    category: 'restaurant',
    requirements: [
      'دارا بودن پروانه کسب معتبر',
      'حداقل 2 سال سابقه کار',
      'رعایت استانداردهای بهداشتی'
    ],
    benefits: [
      'تخفیف در خرید مواد اولیه',
      'دسترسی به آموزش‌های تخصصی',
      'شرکت در نمایشگاه‌های تخصصی'
    ]
  };

  it('renders union information correctly', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('اتحادیه رستوران‌داران')).toBeInTheDocument();
    expect(screen.getByText('اتحادیه رسمی رستوران‌های تهران')).toBeInTheDocument();
    expect(screen.getByText('150 عضو')).toBeInTheDocument();
  });

  it('displays membership requirements', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('شرایط عضویت')).toBeInTheDocument();
    expect(screen.getByText('دارا بودن پروانه کسب معتبر')).toBeInTheDocument();
    expect(screen.getByText('حداقل 2 سال سابقه کار')).toBeInTheDocument();
    expect(screen.getByText('رعایت استانداردهای بهداشتی')).toBeInTheDocument();
  });

  it('displays membership benefits', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('مزایای عضویت')).toBeInTheDocument();
    expect(screen.getByText('تخفیف در خرید مواد اولیه')).toBeInTheDocument();
    expect(screen.getByText('دسترسی به آموزش‌های تخصصی')).toBeInTheDocument();
    expect(screen.getByText('شرکت در نمایشگاه‌های تخصصی')).toBeInTheDocument();
  });

  it('handles membership application', () => {
    const mockOnApply = jest.fn();
    render(<UnionMembership union={mockUnion} onApply={mockOnApply} />);
    
    const applyButton = screen.getByText('درخواست عضویت');
    fireEvent.click(applyButton);
    
    expect(mockOnApply).toHaveBeenCalledWith(mockUnion.id);
  });

  it('displays application status for pending applications', () => {
    render(<UnionMembership union={mockUnion} applicationStatus="pending" />);
    
    expect(screen.getByText('درخواست عضویت شما در حال بررسی است')).toBeInTheDocument();
  });

  it('displays application status for approved applications', () => {
    render(<UnionMembership union={mockUnion} applicationStatus="approved" />);
    
    expect(screen.getByText('شما عضو این اتحادیه هستید')).toBeInTheDocument();
  });

  it('displays application status for rejected applications', () => {
    render(<UnionMembership union={mockUnion} applicationStatus="rejected" />);
    
    expect(screen.getByText('درخواست عضویت شما رد شده است')).toBeInTheDocument();
  });

  it('allows viewing member list for approved members', () => {
    render(<UnionMembership union={mockUnion} applicationStatus="approved" />);
    
    const viewMembersButton = screen.getByText('مشاهده لیست اعضا');
    expect(viewMembersButton).toBeInTheDocument();
  });

  it('displays membership fees', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('هزینه عضویت سالانه: 2,000,000 تومان')).toBeInTheDocument();
  });
}); 