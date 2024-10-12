import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const register = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/users/register`, { username, password });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};