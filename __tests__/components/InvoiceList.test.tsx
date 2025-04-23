import { fireEvent, render, screen } from '@testing-library/react';

import InvoiceList from '../../src/components/InvoiceList';
import { Invoice } from '../../src/types/invoice';

describe('InvoiceList Component', () => {
  const mockInvoices: Invoice[] = [
    {
      id: 1,
      number: 'INV-001',
      amount: 1500000,
      status: 'paid',
      date: '1402/01/01',
      customer: 'مشتری تست',
    },
    {
      id: 2,
      number: 'INV-002',
      amount: 2000000,
      status: 'pending',
      date: '1402/01/02',
      customer: 'مشتری ویژه',
    },
  ];

  it('renders list of invoices correctly', () => {
    render(<InvoiceList invoices={mockInvoices} />);

    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('INV-002')).toBeInTheDocument();
    expect(screen.getByText('1,500,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('2,000,000 تومان')).toBeInTheDocument();
  });

  it('shows invoice status', () => {
    render(<InvoiceList invoices={mockInvoices} />);

    expect(screen.getByText('پرداخت شده')).toBeInTheDocument();
    expect(screen.getByText('در انتظار پرداخت')).toBeInTheDocument();
  });

  it('allows downloading invoice', () => {
    render(<InvoiceList invoices={mockInvoices} />);

    const downloadButton = screen.getAllByText('دانلود')[0];
    fireEvent.click(downloadButton);

    expect(window.location.href).toBe('/invoices/1/download');
  });

  it('filters invoices by status', () => {
    render(<InvoiceList invoices={mockInvoices} />);

    const filterButton = screen.getByText('پرداخت شده');
    fireEvent.click(filterButton);

    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.queryByText('INV-002')).not.toBeInTheDocument();
  });
});
