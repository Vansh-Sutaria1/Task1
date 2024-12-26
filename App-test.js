import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginn, uploadFiles } from './client';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('client.js API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginn function', () => {
    it('stores the auth token and returns true when login is successful', async () => {
      const mockToken = 'mockAccessToken';
      const mockResponse = { data: { access_token: mockToken } };
      axios.post.mockResolvedValue(mockResponse);

      const username = 'testuser';
      const password = 'testpassword';

      const result = await loginn(username, password);

      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/user/login', {
        username,
        password,
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', mockToken);
      expect(result).toBe(true);
    });

    it('returns false when no token is received', async () => {
      const mockResponse = { data: {} };
      axios.post.mockResolvedValue(mockResponse);

      const result = await loginn('testuser', 'testpassword');

      expect(result).toBe(false);
    });

    it('throws an error when the request fails', async () => {
      axios.post.mockRejectedValue(new Error('Network error'));

      await expect(loginn('testuser', 'testpassword')).rejects.toThrow('Failed to verify credentials');
    });
  });

  describe('uploadFiles function', () => {
    it('uploads files successfully and returns true', async () => {
      const mockResponse = { data: { message: 'Files uploaded successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const mockFiles = [
        new File(['content'], 'test1.txt', { type: 'text/plain' }),
        new File(['content'], 'test2.txt', { type: 'text/plain' }),
      ];

      const result = await uploadFiles(mockFiles);

      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/user/upload-files',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      expect(result).toBe(true);
    });

    it('returns false when the response does not contain a success message', async () => {
      const mockResponse = { data: {} };
      axios.post.mockResolvedValue(mockResponse);

      const result = await uploadFiles([]);

      expect(result).toBe(false);
    });

    it('throws an error when the upload fails', async () => {
      axios.post.mockRejectedValue(new Error('Upload error'));

      await expect(uploadFiles([])).rejects.toThrow('Failed to upload files');
    });
  });
});


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginn, uploadFiles } from './client';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('client.js API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginn function', () => {
    it('stores the auth token and returns true when login is successful', async () => {
      const mockToken = 'mockAccessToken';
      const mockResponse = { data: { access_token: mockToken } };
      axios.post.mockResolvedValue(mockResponse);

      const username = 'testuser';
      const password = 'testpassword';

      const result = await loginn(username, password);

      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/user/login', {
        username,
        password,
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', mockToken);
      expect(result).toBe(true);
    });

    it('returns false when no token is received', async () => {
      const mockResponse = { data: {} };
      axios.post.mockResolvedValue(mockResponse);

      const result = await loginn('testuser', 'testpassword');

      expect(result).toBe(false);
    });

    it('throws an error when the request fails', async () => {
      axios.post.mockRejectedValue(new Error('Network error'));

      await expect(loginn('testuser', 'testpassword')).rejects.toThrow('Failed to verify credentials');
    });
  });

  describe('uploadFiles function', () => {
    it('uploads files successfully and returns true', async () => {
      const mockResponse = { data: { message: 'Files uploaded successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const mockFiles = [
        new File(['content'], 'test1.txt', { type: 'text/plain' }),
        new File(['content'], 'test2.txt', { type: 'text/plain' }),
      ];

      const result = await uploadFiles(mockFiles);

      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/user/upload-files',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      expect(result).toBe(true);
    });

    it('returns false when the response does not contain a success message', async () => {
      const mockResponse = { data: {} };
      axios.post.mockResolvedValue(mockResponse);

      const result = await uploadFiles([]);

      expect(result).toBe(false);
    });

    it('throws an error when the upload fails', async () => {
      axios.post.mockRejectedValue(new Error('Upload error'));

      await expect(uploadFiles([])).rejects.toThrow('Failed to upload files');
    });
  });
});
