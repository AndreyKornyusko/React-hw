import axios from 'axios';

axios.defaults.baseURL = 'https://my-cool-projectapi.herokuapp.com/';
// http://localhost:3000

export const getAllMenuItems = async () => {
  const response = await axios.get('/menu');
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get('/categories');
  return response.data;
};

export const getMenuItemsWithCategory = async category => {
  const response = await axios.get(`/menu?category=${category}`);
  return response.data;
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get('./order');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getItemsById = async id => {
  const response = await axios.get(`/menu/${id}`);
  return response.data;
};
