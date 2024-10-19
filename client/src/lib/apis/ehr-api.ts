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

export const fetchPatientById = async (id:String) => {
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

/*-------Patient Allergies ------*/

// Fetch allergies by patient ID
export const fetchAllergiesByPatientID = async (patientID: string) => {
  try {
    const response = await axios.get(`http://localhost:4200/api/v1/patient/getAllergy/${patientID}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching allergies:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch allergies data');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Create a new allergy
export const createAllergy = async (patientID: string, name: string) => {
  try {
    const response = await axios.post(`http://localhost:4200/api/v1/patient/createAllergy`, { patientID, name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating allergy:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create allergy');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

//update allergy by ID
export const updateAllergy = async (id: number, allergyData: { name: string }) => {
  try {
    const response = await axios.put(`http://localhost:4200/api/v1/patient/updateAllergy/${id}`, allergyData);
    return response.data;
  } catch (error) {
    console.error("Error updating allergy:", error);
    throw error;
  }
};

// Delete an allergy by ID
export const deleteAllergy = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:4200/api/v1/patient/deleteAllergy/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting allergy:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete allergy');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};



/*-------Patient Immunizations ------*/


// Fetch immunizations by patient ID
export const fetchImmunizationsByPatientID = async (patientID: string) => {
  try {
    const response = await axios.get(`http://localhost:4200/api/v1/patient/getImmunization/${patientID}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching immunizations:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch immunizations data');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Create a new immunization
export const createImmunization = async (patientID: string, name: string) => {
  try {
    const response = await axios.post(`http://localhost:4200/api/v1/patient/createImmunization`, { patientID, name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating immunization:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create immunization');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Update immunization by ID
export const updateImmunization = async (id: number, immunizationData: { name: string }) => {
  try {
    const response = await axios.put(`http://localhost:4200/api/v1/patient/updateImmunization/${id}`, immunizationData);
    return response.data;
  } catch (error) {
    console.error("Error updating immunization:", error);
    throw error;
  }
};

// Delete an immunization by ID
export const deleteImmunization = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:4200/api/v1/patient/deleteImmunization/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting immunization:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete immunization');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};





