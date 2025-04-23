import { render, screen, fireEvent } from '@testing-library/react';
import BusinessServices from '@/components/BusinessServices';

describe('BusinessServices Component', () => {
  const mockServices = [
    {
      id: 1,
      name: 'تحویل غذا',
      description: 'تحویل غذا به تمام نقاط شهر',
      price: 15000,
      duration: '30-45 دقیقه',
      availability: true
    },
    {
      id: 2,
      name: 'پذیرایی در محل',
      description: 'پذیرایی در مراسم‌های مختلف',
      price: 500000,
      duration: 'ساعتی',
      availability: false
    }
  ];

  it('renders list of services correctly', () => {
    render(<BusinessServices services={mockServices} />);
    
    expect(screen.getByText('تحویل غذا')).toBeInTheDocument();
    expect(screen.getByText('پذیرایی در محل')).toBeInTheDocument();
    expect(screen.getByText('15,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('500,000 تومان')).toBeInTheDocument();
  });

  it('displays service availability status', () => {
    render(<BusinessServices services={mockServices} />);
    
    expect(screen.getByText('موجود')).toBeInTheDocument();
    expect(screen.getByText('ناموجود')).toBeInTheDocument();
  });

  it('allows adding new service', () => {
    const mockOnAdd = jest.fn();
    render(<BusinessServices services={mockServices} onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('افزودن خدمت جدید');
    fireEvent.click(addButton);
    
    const nameInput = screen.getByLabelText('نام خدمت');
    const descriptionInput = screen.getByLabelText('توضیحات');
    const priceInput = screen.getByLabelText('قیمت');
    
    fireEvent.change(nameInput, { target: { value: 'خدمت جدید' } });
    fireEvent.change(descriptionInput, { target: { value: 'توضیحات خدمت جدید' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });
    
    const submitButton = screen.getByText('ثبت');
    fireEvent.click(submitButton);
    
    expect(mockOnAdd).toHaveBeenCalledWith({
      name: 'خدمت جدید',
      description: 'توضیحات خدمت جدید',
      price: 20000,
      duration: '',
      availability: true
    });
  });

  it('allows editing existing service', () => {
    const mockOnEdit = jest.fn();
    render(<BusinessServices services={mockServices} onEdit={mockOnEdit} />);
    
    const editButton = screen.getAllByText('ویرایش')[0];
    fireEvent.click(editButton);
    
    const priceInput = screen.getByLabelText('قیمت');
    fireEvent.change(priceInput, { target: { value: '20000' } });
    
    const saveButton = screen.getByText('ذخیره');
    fireEvent.click(saveButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith({
      ...mockServices[0],
      price: 20000
    });
  });

  it('allows toggling service availability', () => {
    const mockOnToggle = jest.fn();
    render(<BusinessServices services={mockServices} onToggleAvailability={mockOnToggle} />);
    
    const toggleButton = screen.getAllByRole('switch')[0];
    fireEvent.click(toggleButton);
    
    expect(mockOnToggle).toHaveBeenCalledWith(mockServices[0].id);
  });

  it('displays service duration', () => {
    render(<BusinessServices services={mockServices} />);
    
    expect(screen.getByText('مدت زمان: 30-45 دقیقه')).toBeInTheDocument();
    expect(screen.getByText('مدت زمان: ساعتی')).toBeInTheDocument();
  });

  it('displays empty state when no services are available', () => {
    render(<BusinessServices services={[]} />);
    
    expect(screen.getByText('هیچ خدمتی ثبت نشده است')).toBeInTheDocument();
  });

  it('allows filtering services by availability', () => {
    render(<BusinessServices services={mockServices} />);
    
    const filterButton = screen.getByText('فقط خدمات موجود');
    fireEvent.click(filterButton);
    
    expect(screen.getByText('تحویل غذا')).toBeInTheDocument();
    expect(screen.queryByText('پذیرایی در محل')).not.toBeInTheDocument();
  });
}); 