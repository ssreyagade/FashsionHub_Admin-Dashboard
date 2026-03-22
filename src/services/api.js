import axios from "axios";

const API = "http://localhost:3001";

export const getEmployees = () => axios.get(`${API}/employees`);
export const addEmployee = (data) => axios.post(`${API}/employees`, data);
export const deleteEmployee = (id) => axios.delete(`${API}/employees/${id}`);

export const getProducts = () => axios.get(`${API}/products`);
export const addProduct = (data) => axios.post(`${API}/products`, data);

export const getOrders = () => axios.get(`${API}/orders`);
