import axios from 'axios';

const BASE_URL = 'http://localhost:3000/history';

const getAllOrderHistoryItems = () =>
  axios.get(BASE_URL).then(response => response.data);

const getOrderHistoryById = id =>
  axios.get(`${BASE_URL}/${id}`).then(response => response.data);

const deleteOrderHistoryItem = id =>
  axios.delete(`${BASE_URL}/${id}`).then(response => response.status === 200);

const addOrderHistoryItem = item =>
  axios.post(BASE_URL, item).then(response => response.data);

export {
  getAllOrderHistoryItems,
  getOrderHistoryById,
  deleteOrderHistoryItem,
  addOrderHistoryItem,
};
