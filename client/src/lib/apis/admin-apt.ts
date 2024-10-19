import axios from "axios";


export const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:4200/api/v1/user/all");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching users:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch users data");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
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
