export interface Business {
  id: number;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
} 