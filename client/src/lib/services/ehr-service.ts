// fetchAllPatients
export const fetchPatients = async () => {
    const response = await fetch('http://localhost:5500/api/v1/patient/all');
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    return response.json();
  };
  