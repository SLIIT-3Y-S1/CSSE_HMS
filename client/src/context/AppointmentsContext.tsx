// context/AppointmentsContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the appointment type
interface Appointment {
  id: number;
  title: string;
  status: string;
  amount: number;
}

// Define the context type
interface AppointmentsContextType {
  appointments: Appointment[];
  updateAppointmentStatus: (id: number, status: string) => void;
}

// Create the context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

// Provide the context to children components
export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, title: 'Consultation with Dr. Smith', status: 'Pending', amount: 100 },
    { id: 2, title: 'Therapy Session', status: 'Paid', amount: 150 },
    { id: 3, title: 'Dental Checkup', status: 'Pending', amount: 80 },
  ]);

  const updateAppointmentStatus = (id: number, status: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, updateAppointmentStatus }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use the AppointmentsContext
export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};
