import { fireEvent, render, screen } from '@testing-library/react';

import MapView from '../../src/components/MapView';
import { Business } from '../../src/types/business';

describe('MapView Component', () => {
  const mockBusinesses: Business[] = [
    {
      id: 1,
      name: 'رستوران تست',
      address: 'تهران، خیابان تست',
      location: {
        lat: 35.6892,
        lng: 51.389,
      },
    },
    {
      id: 2,
      name: 'کافه تست',
      address: 'تهران، خیابان تست 2',
      location: {
        lat: 35.6893,
        lng: 51.3891,
      },
    },
  ];

  it('renders map with business markers', () => {
    render(<MapView businesses={mockBusinesses} />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('business-marker')).toHaveLength(2);
  });

  it('shows business details when marker is clicked', () => {
    render(<MapView businesses={mockBusinesses} />);

    const marker = screen.getAllByTestId('business-marker')[0];
    fireEvent.click(marker);

    expect(screen.getByText('رستوران تست')).toBeInTheDocument();
    expect(screen.getByText('تهران، خیابان تست')).toBeInTheDocument();
  });

  it('centers map on selected business', () => {
    const mockOnCenterChange = jest.fn();
    render(
      <MapView
        businesses={mockBusinesses}
        onCenterChange={mockOnCenterChange}
      />
    );

    const marker = screen.getAllByTestId('business-marker')[0];
    fireEvent.click(marker);

    expect(mockOnCenterChange).toHaveBeenCalledWith(mockBusinesses[0].location);
  });

  it('filters businesses by type', () => {
    render(<MapView businesses={mockBusinesses} />);

    const filterButton = screen.getByText('رستوران‌ها');
    fireEvent.click(filterButton);

    expect(screen.getAllByTestId('business-marker')).toHaveLength(1);
    expect(screen.getByText('رستوران تست')).toBeInTheDocument();
  });
});
