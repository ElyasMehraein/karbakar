import { render, screen, fireEvent } from '@testing-library/react';
import UnionMembership from '../../src/components/UnionMembership';
import { Union } from '../../src/types/union';

describe('UnionMembership Component', () => {
  const mockUnion: Union = {
    id: 1,
    name: 'اتحادیه صنف رستوران‌داران',
    description: 'اتحادیه رسمی رستوران‌داران تهران',
    members: 150,
    establishedDate: '1390/01/01'
  };

  it('renders union membership details correctly', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('اتحادیه صنف رستوران‌داران')).toBeInTheDocument();
    expect(screen.getByText('اتحادیه رسمی رستوران‌داران تهران')).toBeInTheDocument();
    expect(screen.getByText('150 عضو')).toBeInTheDocument();
    expect(screen.getByText('تاریخ تاسیس: 1390/01/01')).toBeInTheDocument();
  });

  it('allows leaving the union', () => {
    const mockOnLeave = jest.fn();
    render(<UnionMembership union={mockUnion} onLeave={mockOnLeave} />);
    
    const leaveButton = screen.getByText('خروج از اتحادیه');
    fireEvent.click(leaveButton);
    
    expect(mockOnLeave).toHaveBeenCalledWith(mockUnion.id);
  });

  it('displays membership benefits', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('مزایای عضویت')).toBeInTheDocument();
    expect(screen.getByText('تخفیف‌های ویژه')).toBeInTheDocument();
    expect(screen.getByText('دوره‌های آموزشی')).toBeInTheDocument();
  });

  it('shows membership status', () => {
    render(<UnionMembership union={mockUnion} />);
    
    expect(screen.getByText('وضعیت عضویت: فعال')).toBeInTheDocument();
    expect(screen.getByText('تاریخ عضویت: 1402/01/01')).toBeInTheDocument();
  });
}); 