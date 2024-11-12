import api from './api';

const login = async (credentials) => {
  return api.post('/auth/login', credentials);
};

const register = async (data) => {
  return api.post('/auth/register', data);
};

export default { login, register };
