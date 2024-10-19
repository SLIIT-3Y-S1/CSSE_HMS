import emailjs from 'emailjs-com';

export interface UserProfile { //dummy profile (test purpose only:until login intergration)
  userID: string;
  patientID:string;
  Name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

// Function to fetch the user profile (with dummy data)
export const fetchUserProfile = async (): Promise<UserProfile> => {
  console.log('Fetching user profile...');

  // Simulate a delay and return the dummy profile data
  return new Promise((resolve) => {
    setTimeout(() => {
      const dummyProfile: UserProfile = {
        userID: '12345',
        patientID:'0001',
        Name: 'John Doe',
        email: 'ks2005755@gmail.com',
        phoneNumber: '+1234567890',
        address: '123 Main St, Springfield, IL',
      };

      resolve(dummyProfile);
    }, 250); 
  });
};

// Interface for the Appointment information
export interface Appointment {
  appointmentID: string;
  appointmentType: string;
  status: string;
  Doctor: Doctor;
  ConsultChart: ConsultChart;
  reschedule?: boolean;
  consultDate: string;
  consultTime: string;
  hospitalName: string;
  
}

export interface Doctor {
    doctorID: string;
    firstname: string;
    lastname: string;
    specialization: string;
  }

  export interface ConsultChart {
    consultChartID: string;
    doctorID: string;
    consultDate: string;
    consultTime: string;
    hospitalName: string;
    hospitalFee: string;
  }

  // Interface for appointment data
  export interface CreateAppointmentDto {
    patientID: string;
    doctorID: string;
    consultChartID: string;
    appointmentType: string;
    status?: string;
    refund?: boolean;
    reschedule?: boolean;
  }

// Function to create a new appointment
export const createAppointment = async (appointmentData: CreateAppointmentDto) => {
  try {
    const response = await fetch('http://localhost:5500/api/v1/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    const result = await response.json();

    // Send email notification using EmailJS
    const userProfile = await fetchUserProfile(); // Assuming the user profile contains the patient's email
    const doctor = await fetchDoctors().then((doctors) =>
      doctors.find((doc) => doc.doctorID === appointmentData.doctorID)
    );

    
    const consultChart = await fetchConsultCharts(appointmentData.doctorID).then((charts) =>
      charts.find((chart) => chart.consultChartID === appointmentData.consultChartID)
    );

    // Send the notification email
    emailjs.init("dNcOzbQtXPc3k3dBi");
    emailjs.send("service_kxtl0dv", "template_5me7vdo", {
      Name: userProfile.Name,
      doctor: `${doctor?.firstname} ${doctor?.lastname}`,
      date: consultChart?.consultDate,
      time: consultChart?.consultTime,
      hospitalName: consultChart?.hospitalName,
      email: userProfile.email,
    })
    .then(() => {
      console.log('Email sent successfully');
    }, (error) => {
      console.error('Email sending error:', error);
    });

    return result;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};


  // Fetch consult charts by doctor ID
export const fetchConsultCharts = async (doctorID: string): Promise<ConsultChart[]> => {
    console.log('Fetching consult charts for doctor ID:', doctorID);
    try {
      const response = await fetch(`http://localhost:5500/api/v1/appointments/consult-charts/${doctorID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch consult charts');
      }
  
      const data = await response.json();
  
      // Map backend response to match the frontend interface structure
      const consultCharts: ConsultChart[] = data.map((item: any) => ({
        consultChartID: item.consultChartID,
        doctorID: item.doctorID,
        consultDate: item.consultDate,
        consultTime: item.consultTime,
        hospitalName: item.Hospital.hospitalName,
        hospitalFee: item.Hospital.hospitalFee,
      }));
  
      return consultCharts;
    } catch (error) {
      console.error('Error fetching consult charts:', error);
      return [];
    }
  };
  
  
  
  export const fetchDoctors = async (): Promise<Doctor[]> => {
    console.log('fetching doctors...');
    try {
      const response = await fetch('http://localhost:5500/api/v1/appointments/doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
  
      const data: Doctor[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  };

  // Function to fetch appointments by patientID
export const fetchAppointmentsByPatientID = async (patientID: string): Promise<Appointment[]> => {
  try {
    const response = await fetch(`http://localhost:5500/api/v1/appointments/patient/${patientID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    const appointments: Appointment[] = await response.json();
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
  

export const deleteAppointment = async (appointmentID: string) => {
  try {
    const response = await fetch(`http://localhost:5500/api/v1/appointments/${appointmentID}`, {
      method: 'DELETE', // HTTP method to delete the appointment
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers like authorization if required
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete the appointment');
    }

    const data = await response.json();
    console.log('Appointment deleted successfully:', data);
    // Optionally, refresh the appointments list or handle post-delete logic here
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
};
