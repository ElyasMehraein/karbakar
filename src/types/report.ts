export interface Report {
  id: number;
  title: string;
  type: 'sales' | 'financial';
  period: string;
  status: 'completed' | 'pending';
  createdAt: string;
  downloadUrl: string;
} 