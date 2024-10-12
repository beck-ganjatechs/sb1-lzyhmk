import axios from 'axios';
import { getCurrentUser } from './auth';

const API_URL = 'http://localhost:5000/api';

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

export const fetchProducts = async (page = 1, type = '', sortBy = '') => {
  const response = await axios.get(`${API_URL}/products`, {
    headers: authHeader(),
    params: { page, type, sortBy }
  });
  return response.data;
};

export const createProduct = async (productData: FormData) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateProduct = async (id: string, productData: FormData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    headers: authHeader()
  });
  return response.data;
};