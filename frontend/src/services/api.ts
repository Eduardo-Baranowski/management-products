import axios from 'axios';
import env from 'react-dotenv';

const api = axios.create({
  baseURL: `http://${env.API_URL}`,
});

export default api;
