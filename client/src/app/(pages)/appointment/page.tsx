'use client';

import { useState } from 'react';
import AppointmentBookingForm from '../../../components/appointmentCom/AppointmentBookingForm';
import ViewAppointments from '../../../components/appointmentCom/viewAppointment'; // Assuming you have this component
import { UserProfile } from '../../../../lib/services/appointment_Services'; // Assuming you have the UserProfile interface in this service

// Example dummy user profile
const dummyUserProfile: UserProfile = {
  userID: '12345',
  patientID: '0001', // Test Patient ID from the profile
  Name: 'John Doe',
  email: 'johndoe@example.com',
  phoneNumber: '123-456-7890',
  address: '123 Main St, Cityville'
};

const AppointmentHomePage: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(true); // Set to true by default to show the form
  const [showAppointments, setShowAppointments] = useState(false); // New state for showing appointments
  const [patientID, setPatientID] = useState<string>(''); // New state to hold patient ID
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state

  const handleBookingSuccess = () => {
    console.log('Appointment booking successful!');
    setSuccessMessage('Your appointment has been successfully booked!'); // Set success message
    setTimeout(() => {
      setShowBookingForm(false); // Hide the booking form
      setShowAppointments(true); // Show the appointments view
    }, 2000); // Delay the transition to show success message
  };

  const handleCloseForm = () => {
    setShowBookingForm(false); // Optional: You can hide the form after submission if needed
  };

  // Toggle between booking form and appointments view
  const toggleView = () => {
    if (showBookingForm) {
      // When switching to view appointments, use the patientID from the dummy profile
      const enteredPatientID = dummyUserProfile.patientID;
      setPatientID(enteredPatientID);
      setShowAppointments(true);
      setShowBookingForm(false);
    } else {
      setShowBookingForm(true);
      setShowAppointments(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {showBookingForm ? 'Book an Appointment' : 'Your Appointments'}
        </h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={toggleView}
        >
          {showBookingForm ? 'View Appointments' : 'Book Appointment'}
        </button>
      </div>

      {/* Display success message after booking */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      {showBookingForm && (
        <AppointmentBookingForm onClose={handleCloseForm} onBookingSuccess={handleBookingSuccess} />
      )}

      {showAppointments && patientID && (
        <ViewAppointments patientID={patientID} />
      )}
    </div>
  );
};

export default AppointmentHomePage;
