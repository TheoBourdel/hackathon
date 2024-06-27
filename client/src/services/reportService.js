import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';

const createReport= async (report) => {
  try {
    const response = await axios.post(API_URL+'/report', report);
    return response.data;
  } catch (error) {
    console.error('Failed to create report', error);
    throw error;
  }
};

const getReports = async () => {
    try {
      const response = await axios.get(API_URL+'/reports');
      return response.data;
    } catch (error) {
      console.error('Failed to create report', error);
      throw error;
    }
  };

export default {
    createReport,
    getReports
};