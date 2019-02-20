import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:51932',
});

export default api;
