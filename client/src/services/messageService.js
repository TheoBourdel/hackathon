import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';

const createMessage = async (message) => {
  try {
    const response = await axios.post(API_URL+'/messages', message);
    return response.data;
  } catch (error) {
    console.error('Failed to create message', error);
    throw error;
  }
};

const getMessages = async () => {
    try {
      const response = await axios.get(API_URL+'/messages');
      return response.data;
    } catch (error) {
      console.error('Failed to create message', error);
      throw error;
    }
  };

export default {
  createMessage,
  getMessages
};
