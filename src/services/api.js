import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:55786',
});

export default api;
