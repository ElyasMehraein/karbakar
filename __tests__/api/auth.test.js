import axios from 'axios';
import { login, register, logout } from '@/utils/auth';

jest.mock('axios');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('successfully logs in user', async () => {
      const mockResponse = {
        data: {
          token: 'mock-token',
          user: { id: 1, name: 'Test User' }
        }
      };
      
      axios.post.mockResolvedValue(mockResponse);
      
      const result = await login('test@example.com', 'password');
      
      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
        email: 'test@example.com',
        password: 'password'
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('handles login errors', async () => {
      const mockError = new Error('Login failed');
      axios.post.mockRejectedValue(mockError);
      
      await expect(login('test@example.com', 'wrong-password'))
        .rejects
        .toThrow('Login failed');
    });
  });

  describe('register', () => {
    it('successfully registers new user', async () => {
      const mockResponse = {
        data: {
          token: 'mock-token',
          user: { id: 1, name: 'New User' }
        }
      };
      
      axios.post.mockResolvedValue(mockResponse);
      
      const userData = {
        name: 'New User',
        email: 'new@example.com',
        password: 'password',
        businessType: 'restaurant'
      };
      
      const result = await register(userData);
      
      expect(axios.post).toHaveBeenCalledWith('/api/auth/register', userData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logout', () => {
    it('successfully logs out user', async () => {
      axios.post.mockResolvedValue({ data: { success: true } });
      
      await logout();
      
      expect(axios.post).toHaveBeenCalledWith('/api/auth/logout');
    });
  });
}); 