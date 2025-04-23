export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'message' | 'system';
  read: boolean;
  timestamp: string;
}
