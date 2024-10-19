import axios from 'axios';

// fetch All Patients
export const fetchPatients = async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/v1/patient/all');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching patients:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch patients data');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// fetch Patient details by ID

export const fetchPatientById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4200/api/v1/patient/getbyPatientID/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching patient:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch patient data');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}