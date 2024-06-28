import axios from 'axios';
import { API_URL } from './messageService';

const getUsers = async () => {
  try {
    const response = await axios.get(API_URL+'/users');
    return response.data;
  } catch (error) {
    console.error('Failed to create message', error);
    throw error;
  }
};

const getUserMessages = async (id) => {
  try {
    const response = await axios.get(API_URL+'/messages/user/'+id);
    return response.data;
  } catch (error) {
    console.error('Failed to create message', error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await axios.get(API_URL+'/users/'+id);
    return response.data;
  } catch (error) {
    console.error('Failed to create message', error);
    throw error;
  }
};

const userService = {
  getUsers,
  getUserMessages,
  getUser
};

export default userService;