export interface Business {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  businessType: string;
  services: string[];
  workingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
} 