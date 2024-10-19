import axios from 'axios';

export const fetchDoctorDetails = async (userID: string) => {
  try {
    const response = await axios.get(`http://localhost:4200/api/v1/doctor/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    throw error;
  }
};

export const createDoctorDetails = async (formData: any) => {
  try {
    const response = await axios.post(`http://localhost:4200/api/v1/doctor`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting doctor details:', error);
    throw error;
  }
};

export const updateDoctorDetails = async (userID: string, formData: any) => {
  try {
    const response = await axios.put(`http://localhost:4200/api/v1/doctor/${userID}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating doctor details:', error);
    throw error;
  }
};