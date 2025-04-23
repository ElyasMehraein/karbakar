import { render, screen, fireEvent } from '@testing-library/react';
import ReportList from '@/components/ReportList';

describe('ReportList Component', () => {
  const mockReports = [
    {
      id: 1,
      title: 'گزارش ماهانه فروش',
      description: 'گزارش فروش ماه گذشته رستوران',
      business: {
        id: 1,
        name: 'رستوران نمونه'
      },
      type: 'sales',
      period: 'monthly',
      createdAt: '2024-02-20T10:00:00Z',
      status: 'completed'
    },
    {
      id: 2,
      title: 'گزارش موجودی',
      description: 'گزارش موجودی مواد اولیه',
      business: {
        id: 1,
        name: 'رستوران نمونه'
      },
      type: 'inventory',
      period: 'weekly',
      createdAt: '2024-02-19T15:30:00Z',
      status: 'pending'
    }
  ];

  it('renders list of reports correctly', () => {
    render(<ReportList reports={mockReports} />);
    
    expect(screen.getByText('گزارش ماهانه فروش')).toBeInTheDocument();
    expect(screen.getByText('گزارش موجودی')).toBeInTheDocument();
    expect(screen.getByText('رستوران نمونه')).toBeInTheDocument();
  });

  it('filters reports by type', () => {
    render(<ReportList reports={mockReports} selectedType="sales" />);
    
    expect(screen.getByText('گزارش ماهانه فروش')).toBeInTheDocument();
    expect(screen.queryByText('گزارش موجودی')).not.toBeInTheDocument();
  });

  it('allows deleting reports', () => {
    const mockOnDelete = jest.fn();
    render(<ReportList reports={mockReports} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getAllByText('حذف')[0];
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockReports[0]);
  });

  it('displays empty state when no reports are available', () => {
    render(<ReportList reports={[]} />);
    
    expect(screen.getByText('گزارشی یافت نشد')).toBeInTheDocument();
  });

  it('displays correct status badges', () => {
    render(<ReportList reports={mockReports} />);
    
    expect(screen.getByText('تکمیل شده')).toBeInTheDocument();
    expect(screen.getByText('در انتظار')).toBeInTheDocument();
  });

  it('allows downloading completed reports', () => {
    const mockOnDownload = jest.fn();
    render(<ReportList reports={mockReports} onDownload={mockOnDownload} />);
    
    const downloadButton = screen.getByText('دانلود');
    fireEvent.click(downloadButton);
    
    expect(mockOnDownload).toHaveBeenCalledWith(mockReports[0]);
  });

  it('displays report period correctly', () => {
    render(<ReportList reports={mockReports} />);
    
    expect(screen.getByText('ماهانه')).toBeInTheDocument();
    expect(screen.getByText('هفتگی')).toBeInTheDocument();
  });

  it('allows filtering by date range', () => {
    render(<ReportList reports={mockReports} />);
    
    const startDateInput = screen.getByLabelText('از تاریخ');
    const endDateInput = screen.getByLabelText('تا تاریخ');
    
    fireEvent.change(startDateInput, { target: { value: '2024-02-19' } });
    fireEvent.change(endDateInput, { target: { value: '2024-02-20' } });
    
    expect(screen.getByText('گزارش ماهانه فروش')).toBeInTheDocument();
    expect(screen.getByText('گزارش موجودی')).toBeInTheDocument();
  });
}); 