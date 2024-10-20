
"use client";

import { useRouter } from 'next/navigation';
import { useAppointments } from '@/context/AppointmentsContext';

const AppointmentList: React.FC = () => {
  const router = useRouter();
  const { appointments, updateAppointmentStatus } = useAppointments();

  const navigationHandler = (appointment: any) => {
    const query = new URLSearchParams({
      id: appointment.id.toString(),
      title: appointment.title,
      amount: appointment.amount.toString(),
      status: appointment.status,
    }).toString();
  
    router.push(`/payment-management/${appointment.id}?${query}`);
  };
  

  const handlePayment = (id: number) => {
    updateAppointmentStatus(id, 'Paid');
  };

  return (
    <div className="appointment-list m-10">
      <h2 className="title font-bold text-green-800">Your Appointments List</h2>
      <ul className="appointment-list-container">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div>
              <h3>{appointment.title}</h3>
              <p>
                Status: <strong>{appointment.status}</strong>
              </p>
            </div>
            {appointment.status === 'Pending' && (
              <div className="actions">
                <button
                  className="pay-now-btn"
                  onClick={() => navigationHandler(appointment)}
                >
                  Pay Now
                </button>
                {/* <button
                  className="mark-paid-btn"
                  onClick={() => handlePayment(appointment.id)}
                >
                  Mark as Paid
                </button> */}
              </div>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .appointment-list {
          padding: 20px;
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        .appointment-list-container {
          list-style: none;
          padding: 0;
        }
        .appointment-item {
          display: flex;
          justify-content: space-between;
          background: #f9f9f9;
          margin-bottom: 15px;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .actions {
          display: flex;
          gap: 10px;
        }
        .pay-now-btn,
        .mark-paid-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
        }
        .mark-paid-btn {
          background-color: #2196f3;
        }
        .pay-now-btn:hover,
        .mark-paid-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default AppointmentList;
