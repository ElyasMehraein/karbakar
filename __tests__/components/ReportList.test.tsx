import { render, screen, fireEvent } from '@testing-library/react';
import ReportList from '../../src/components/ReportList';
import { Report } from '../../src/types/report';

describe('ReportList Component', () => {
  const mockReports: Report[] = [
    {
      id: 1,
      title: 'گزارش فروش',
      type: 'sales',
      period: 'ماهانه',
      status: 'completed',
      createdAt: '1402/01/01',
      downloadUrl: '/reports/1'
    },
    {
      id: 2,
      title: 'گزارش مالی',
      type: 'financial',
      period: 'فصلی',
      status: 'pending',
      createdAt: '1402/01/02',
      downloadUrl: '/reports/2'
    }
  ];

  it('renders list of reports correctly', () => {
    render(<ReportList reports={mockReports} />);
    
    expect(screen.getByText('گزارش فروش')).toBeInTheDocument();
    expect(screen.getByText('گزارش مالی')).toBeInTheDocument();
    expect(screen.getByText('ماهانه')).toBeInTheDocument();
    expect(screen.getByText('فصلی')).toBeInTheDocument();
  });

  it('allows downloading completed reports', () => {
    render(<ReportList reports={mockReports} />);
    
    const downloadButton = screen.getByText('دانلود');
    fireEvent.click(downloadButton);
    
    expect(window.location.href).toBe('/reports/1');
  });

  it('shows report status', () => {
    render(<ReportList reports={mockReports} />);
    
    expect(screen.getByText('تکمیل شده')).toBeInTheDocument();
    expect(screen.getByText('در حال پردازش')).toBeInTheDocument();
  });

  it('filters reports by type', () => {
    render(<ReportList reports={mockReports} />);
    
    const filterButton = screen.getByText('گزارش‌های فروش');
    fireEvent.click(filterButton);
    
    expect(screen.getByText('گزارش فروش')).toBeInTheDocument();
    expect(screen.queryByText('گزارش مالی')).not.toBeInTheDocument();
  });
}); 