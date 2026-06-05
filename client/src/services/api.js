import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getExpenses = () => API.get('/expenses');
export const addExpense = (data) => API.post('/expenses', data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);