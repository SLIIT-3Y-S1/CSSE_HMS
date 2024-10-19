import React, { useState, useEffect } from 'react';
import { fetchAppointmentsByPatientID, Appointment, deleteAppointment } from '../../../lib/services/appointment_Services';

interface ViewAppointmentProps {
  patientID: string;
}

const ViewAppointment: React.FC<ViewAppointmentProps> = ({ patientID }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await fetchAppointmentsByPatientID(patientID);
        setAppointments(data);
      } catch (error) {
        setError('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientID]);

  const handleDelete = async (appointmentID: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');

    if (isConfirmed) {
      try {
        // Call the deleteAppointment function from the service
        await deleteAppointment(appointmentID);
        
        // Remove the deleted appointment from the state
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.appointmentID !== appointmentID)
        );

        alert('Appointment deleted successfully');
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
      }
    }
  };

  const handleReschedule = (appointmentID: string) => {
    console.log('Rescheduling appointment with ID:', appointmentID);
    // Add your reschedule logic here
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {appointments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.appointmentID}
              className="relative bg-white p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Doctor: {appointment.Doctor.firstname} {appointment.Doctor.lastname}
                </h3>
                <p className="text-gray-600">
                  <strong>Specialization:</strong> {appointment.Doctor.specialization}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {new Date(appointment.ConsultChart.consultDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {appointment.ConsultChart.consultTime}
                </p>
                <p className="text-gray-600">
                  <strong>Hospital:</strong> {appointment.ConsultChart.hospitalName}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {appointment.status}
                </p>
              </div>

              <div className="flex space-x-4 absolute right-4 top-4">
                {/* Show reschedule icon only if reschedule is true */}
                {appointment.reschedule && (
                  <button
                    onClick={() => handleReschedule(appointment.appointmentID)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✏️ {/* Unicode icon for "edit" */}
                  </button>
                )}

                {/* Delete Icon */}
                <button
                  onClick={() => handleDelete(appointment.appointmentID)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️ {/* Unicode icon for "trash" */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAppointment;
