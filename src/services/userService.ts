import axios from 'axios';
import _ from 'lodash';
import authHeader from '../utils/authHeaderUtil';

// const user = JSON.parse(localStorage.getItem('user') as any);

const getProfile = async() => {
  const response = await axios.get('/api/user', {
    headers: authHeader()
  })
  return response.data;
}

const getAllUsers = async() => {
  const response = await axios.get('/api/user/all', {
    headers: authHeader()
  })
  return response.data;
}

export const UserService = {
  getProfile,
  getAllUsers
}