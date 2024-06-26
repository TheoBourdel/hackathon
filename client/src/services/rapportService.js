import axios from 'axios';
import { API_URL } from './messageService';

const createRpport = async (report) => {
    try {
      const response = await axios.post(API_URL+'/report', report);
      return response.data;
    } catch (error) {
      console.error('Failed to create message', error);
      throw error;
    }
  };
  

export default {
    createRpport,
};
