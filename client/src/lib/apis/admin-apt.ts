import axios from "axios";


export const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4200/api/v1/user/all");
  
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


export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(
      'http://localhost:4200/api/v1/auth/register',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    if (response.status === 201) {
      alert('User Successfully added !');
    } else {
      alert('Something went wrong !');
    }
  } catch (error) {
    console.error('Error : ', error);
  }
};
