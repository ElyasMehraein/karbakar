import { render, screen, fireEvent } from '@testing-library/react';
import InvoiceList from '@/components/InvoiceList';

describe('InvoiceList Component', () => {
  const mockInvoices = [
    {
      id: 1,
      business: {
        id: 1,
        name: 'رستوران نمونه'
      },
      amount: 1500000,
      status: 'pending',
      dueDate: '2024-03-20',
      createdAt: '2024-02-20T10:00:00Z'
    },
    {
      id: 2,
      business: {
        id: 2,
        name: 'کافی‌شاپ نمونه'
      },
      amount: 800000,
      status: 'paid',
      dueDate: '2024-03-15',
      createdAt: '2024-02-19T15:30:00Z'
    }
  ];

  it('renders list of invoices correctly', () => {
    render(<InvoiceList invoices={mockInvoices} />);
    
    expect(screen.getByText('رستوران نمونه')).toBeInTheDocument();
    expect(screen.getByText('کافی‌شاپ نمونه')).toBeInTheDocument();
    expect(screen.getByText('1,500,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('800,000 تومان')).toBeInTheDocument();
  });

  it('filters invoices by status', () => {
    render(<InvoiceList invoices={mockInvoices} selectedStatus="paid" />);
    
    expect(screen.getByText('کافی‌شاپ نمونه')).toBeInTheDocument();
    expect(screen.queryByText('رستوران نمونه')).not.toBeInTheDocument();
  });

  it('allows paying pending invoices', () => {
    const mockOnPay = jest.fn();
    render(<InvoiceList invoices={mockInvoices} onPay={mockOnPay} />);
    
    const payButton = screen.getByText('پرداخت');
    fireEvent.click(payButton);
    
    expect(mockOnPay).toHaveBeenCalledWith(mockInvoices[0]);
  });

  it('displays empty state when no invoices are available', () => {
    render(<InvoiceList invoices={[]} />);
    
    expect(screen.getByText('صورتحسابی یافت نشد')).toBeInTheDocument();
  });

  it('displays correct status badges', () => {
    render(<InvoiceList invoices={mockInvoices} />);
    
    expect(screen.getByText('در انتظار پرداخت')).toBeInTheDocument();
    expect(screen.getByText('پرداخت شده')).toBeInTheDocument();
  });

  it('sorts invoices by due date', () => {
    render(<InvoiceList invoices={mockInvoices} />);
    
    const invoiceItems = screen.getAllByTestId('invoice-item');
    expect(invoiceItems[0]).toHaveTextContent('کافی‌شاپ نمونه');
    expect(invoiceItems[1]).toHaveTextContent('رستوران نمونه');
  });

  it('displays warning for overdue invoices', () => {
    const overdueInvoice = {
      ...mockInvoices[0],
      dueDate: '2024-02-15'
    };
    
    render(<InvoiceList invoices={[overdueInvoice]} />);
    
    expect(screen.getByText('تاریخ پرداخت گذشته')).toBeInTheDocument();
  });
}); 