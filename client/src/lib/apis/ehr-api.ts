// fetchAllPatients
export const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:4200/api/v1/patient/all");
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch patients data");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error; // Propagate the error to be handled by the caller
    }
  };
  