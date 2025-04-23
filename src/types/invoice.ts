export interface Invoice {
  id: number;
  number: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  customer: string;
}
