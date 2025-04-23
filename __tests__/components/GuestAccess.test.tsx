import { render, screen, fireEvent } from '@testing-library/react';
import GuestAccess from '../../src/components/GuestAccess';
import { Guest } from '../../src/types/guest';

describe('GuestAccess Component', () => {
  const mockGuests: Guest[] = [
    {
      id: 1,
      name: 'مهمان تست',
      email: 'test@example.com',
      accessLevel: 'basic',
      expiresAt: '1402/02/01'
    },
    {
      id: 2,
      name: 'مهمان ویژه',
      email: 'vip@example.com',
      accessLevel: 'premium',
      expiresAt: '1402/03/01'
    }
  ];

  it('renders list of guests correctly', () => {
    render(<GuestAccess guests={mockGuests} />);
    
    expect(screen.getByText('مهمان تست')).toBeInTheDocument();
    expect(screen.getByText('مهمان ویژه')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('vip@example.com')).toBeInTheDocument();
  });

  it('allows adding new guest', () => {
    const mockOnAdd = jest.fn();
    render(<GuestAccess guests={mockGuests} onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('افزودن مهمان');
    fireEvent.click(addButton);
    
    const nameInput = screen.getByLabelText('نام');
    const emailInput = screen.getByLabelText('ایمیل');
    
    fireEvent.change(nameInput, { target: { value: 'مهمان جدید' } });
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    
    const submitButton = screen.getByText('ثبت');
    fireEvent.click(submitButton);
    
    expect(mockOnAdd).toHaveBeenCalledWith({
      name: 'مهمان جدید',
      email: 'new@example.com',
      accessLevel: 'basic'
    });
  });

  it('allows revoking guest access', () => {
    const mockOnRevoke = jest.fn();
    render(<GuestAccess guests={mockGuests} onRevoke={mockOnRevoke} />);
    
    const revokeButton = screen.getAllByText('لغو دسترسی')[0];
    fireEvent.click(revokeButton);
    
    expect(mockOnRevoke).toHaveBeenCalledWith(mockGuests[0].id);
  });

  it('shows guest access level', () => {
    render(<GuestAccess guests={mockGuests} />);
    
    expect(screen.getByText('دسترسی پایه')).toBeInTheDocument();
    expect(screen.getByText('دسترسی ویژه')).toBeInTheDocument();
  });
}); 