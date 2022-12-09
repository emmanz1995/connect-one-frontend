import axios from 'axios';
import { ILogin } from '../utils/types';

async function onLogin(formData: ILogin) {
  const response = await axios.post('/api/auth', formData);
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
}

function onLogout() {
  localStorage.removeItem('user');
}

export const AuthService = {
    onLogin,
    onLogout,
}