import { render, screen } from '@testing-library/react';
import MapView from '@/components/MapView';

// Mock Leaflet components
jest.mock('react-leaflet', () => {
  const mockMap = ({ children, ...props }) => (
    <div data-testid="map" {...props}>
      {children}
    </div>
  );
  const mockTileLayer = ({ ...props }) => (
    <div data-testid="tile-layer" {...props} />
  );
  const mockMarker = ({ ...props }) => (
    <div data-testid="marker" {...props} />
  );
  const mockPopup = ({ children, ...props }) => (
    <div data-testid="popup" {...props}>
      {children}
    </div>
  );

  return {
    MapContainer: mockMap,
    TileLayer: mockTileLayer,
    Marker: mockMarker,
    Popup: mockPopup,
    useMap: () => ({
      setView: jest.fn(),
      flyTo: jest.fn(),
    }),
  };
});

describe('MapView Component', () => {
  const mockBusinesses = [
    {
      id: 1,
      name: 'Business 1',
      location: { lat: 35.6892, lng: 51.3890 },
      type: 'restaurant'
    },
    {
      id: 2,
      name: 'Business 2',
      location: { lat: 35.6992, lng: 51.3990 },
      type: 'cafe'
    }
  ];

  it('renders map with correct initial view', () => {
    render(<MapView businesses={mockBusinesses} />);
    
    const map = screen.getByTestId('map');
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute('center', '[35.6892,51.3890]');
    expect(map).toHaveAttribute('zoom', '13');
  });

  it('renders markers for all businesses', () => {
    render(<MapView businesses={mockBusinesses} />);
    
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(2);
  });

  it('displays business information in popups', () => {
    render(<MapView businesses={mockBusinesses} />);
    
    const popups = screen.getAllByTestId('popup');
    expect(popups).toHaveLength(2);
    
    expect(screen.getByText('Business 1')).toBeInTheDocument();
    expect(screen.getByText('Business 2')).toBeInTheDocument();
  });

  it('filters businesses by type', () => {
    render(<MapView businesses={mockBusinesses} selectedType="restaurant" />);
    
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(1);
    expect(screen.getByText('Business 1')).toBeInTheDocument();
    expect(screen.queryByText('Business 2')).not.toBeInTheDocument();
  });
}); 