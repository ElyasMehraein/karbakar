import { render, screen, fireEvent } from '@testing-library/react';
import UnionList from '@/components/UnionList';

describe('UnionList Component', () => {
  const mockUnions = [
    {
      id: 1,
      name: 'اتحادیه رستوران‌داران',
      description: 'اتحادیه رسمی رستوران‌های تهران',
      members: 150,
      category: 'restaurant'
    },
    {
      id: 2,
      name: 'اتحادیه کافی‌شاپ‌ها',
      description: 'اتحادیه رسمی کافی‌شاپ‌های تهران',
      members: 80,
      category: 'cafe'
    }
  ];

  it('renders list of unions correctly', () => {
    render(<UnionList unions={mockUnions} />);
    
    expect(screen.getByText('اتحادیه رستوران‌داران')).toBeInTheDocument();
    expect(screen.getByText('اتحادیه کافی‌شاپ‌ها')).toBeInTheDocument();
    expect(screen.getByText('150 عضو')).toBeInTheDocument();
    expect(screen.getByText('80 عضو')).toBeInTheDocument();
  });

  it('filters unions by category', () => {
    render(<UnionList unions={mockUnions} selectedCategory="restaurant" />);
    
    expect(screen.getByText('اتحادیه رستوران‌داران')).toBeInTheDocument();
    expect(screen.queryByText('اتحادیه کافی‌شاپ‌ها')).not.toBeInTheDocument();
  });

  it('handles union selection', () => {
    const mockOnSelect = jest.fn();
    render(<UnionList unions={mockUnions} onSelect={mockOnSelect} />);
    
    const unionItem = screen.getByText('اتحادیه رستوران‌داران');
    fireEvent.click(unionItem);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockUnions[0]);
  });

  it('displays empty state when no unions are available', () => {
    render(<UnionList unions={[]} />);
    
    expect(screen.getByText('اتحادیه‌ای یافت نشد')).toBeInTheDocument();
  });

  it('allows searching unions', () => {
    render(<UnionList unions={mockUnions} />);
    
    const searchInput = screen.getByPlaceholderText('جستجوی اتحادیه...');
    fireEvent.change(searchInput, { target: { value: 'رستوران' } });
    
    expect(screen.getByText('اتحادیه رستوران‌داران')).toBeInTheDocument();
    expect(screen.queryByText('اتحادیه کافی‌شاپ‌ها')).not.toBeInTheDocument();
  });
}); 