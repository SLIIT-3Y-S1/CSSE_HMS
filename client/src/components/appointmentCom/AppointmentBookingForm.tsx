import { useState, useEffect } from 'react';
import { fetchDoctors, fetchConsultCharts, Doctor, ConsultChart, createAppointment, CreateAppointmentDto } from '../../../lib/services/appointment_Services';
import { fetchUserProfile, UserProfile } from '../../../lib/services/appointment_Services';

interface AppointmentFormProps {
  onClose: () => void;
  onBookingSuccess: () => void;
}

const AppointmentBookingForm: React.FC<AppointmentFormProps> = ({ onClose, onBookingSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [selectedDoctorID, setSelectedDoctorID] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [consultCharts, setConsultCharts] = useState<ConsultChart[]>([]);
  const [selectedConsultChartID, setSelectedConsultChartID] = useState('');
  const [refundPolicy, setRefundPolicy] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingConsultCharts, setLoadingConsultCharts] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [appointmentCost, setAppointmentCost] = useState<number>(0); // New state to store the calculated cost

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedUserProfile = await fetchUserProfile();
        setUserProfile(fetchedUserProfile);
        setName(fetchedUserProfile.Name);
        setEmail(fetchedUserProfile.email);
        setContact(fetchedUserProfile.phoneNumber);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
        setLoadingDoctors(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoadingDoctors(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchConsultChartsData = async () => {
      if (selectedDoctorID) {
        setLoadingConsultCharts(true);
        try {
          const fetchedConsultCharts = await fetchConsultCharts(selectedDoctorID);
          setConsultCharts(fetchedConsultCharts);
          setLoadingConsultCharts(false);
        } catch (error) {
          console.error('Error fetching consult charts:', error);
          setLoadingConsultCharts(false);
        }
      } else {
        setConsultCharts([]);
      }
    };
    fetchConsultChartsData();
  }, [selectedDoctorID]);

  // Calculate the appointment cost
  useEffect(() => {
    if (selectedConsultChartID && refundPolicy) {
      const selectedChart = consultCharts.find(chart => chart.consultChartID === selectedConsultChartID);
      if (selectedChart) {
        const hospitalFee = parseFloat(selectedChart.hospitalFee); // Get hospital fee from selected consult chart
        const totalCost = hospitalFee + 1500 + 250; // Add Rs. 1500 and Rs. 250 if refund policy is checked
        setAppointmentCost(totalCost);
      }
    } else if (selectedConsultChartID) {
      const selectedChart = consultCharts.find(chart => chart.consultChartID === selectedConsultChartID);
      if (selectedChart) {
        const hospitalFee = parseFloat(selectedChart.hospitalFee); // Get hospital fee from selected consult chart
        const totalCost = hospitalFee + 1500; // Add Rs. 1500
        setAppointmentCost(totalCost);
      }
    }
  }, [selectedConsultChartID, refundPolicy, consultCharts]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userProfile || !selectedDoctorID || !selectedConsultChartID) {
      console.error('Missing required fields');
      return;
    }

    const createAppointmentDto: CreateAppointmentDto = {
      patientID: userProfile.patientID,
      doctorID: selectedDoctorID,
      consultChartID: selectedConsultChartID,
      appointmentType: 'general',
      status: 'scheduled',
      refund: refundPolicy,
      reschedule: refundPolicy,
    };

    try {
      const appointment = await createAppointment(createAppointmentDto);
      console.log("Appointment booked successfully:", appointment);
      onBookingSuccess();
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="flex-grow max-w-2xl w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Book Your Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div>
                <label className="block text-gray-700 mb-2">Consultant/Specialist *</label>
                {loadingDoctors ? (
                  <p>Loading doctors...</p>
                ) : (
                  <select
                    value={selectedDoctorID}
                    onChange={(e) => setSelectedDoctorID(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="" disabled>Select</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctorID} value={doctor.doctorID}>
                        {`${doctor.firstname} ${doctor.lastname} - ${doctor.specialization}`}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Select Consultation *</label>
                {loadingConsultCharts ? (
                  <p>Loading consultations...</p>
                ) : (
                  <select
                    value={selectedConsultChartID}
                    onChange={(e) => setSelectedConsultChartID(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="" disabled>Select</option>
                    {consultCharts.map((chart) => (
                      <option key={chart.consultChartID} value={chart.consultChartID}>
                        {`${chart.hospitalName} - ${new Date(chart.consultDate).toLocaleDateString()} at ${chart.consultTime}`}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={refundPolicy}
                  onChange={() => setRefundPolicy(!refundPolicy)}
                  className="mr-2"
                />
                <label className="text-gray-700">Refund and Reschedule Policy: Rs. 250.00 added</label>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <label className="block text-gray-700 mb-2">Patient Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Contact *</label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total Cost: Rs. {appointmentCost.toFixed(2)}</span>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Submit Appointment
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:flex flex-none w-1/3 p-6 bg-white flex flex-col justify-start items-start">
        <h3 className="text-3xl font-semibold text-blue-600 text-left">Consult with Top Specialists..</h3>
        <p className="mt-1 text-gray-700 text-left">
          "Choose from our team of experienced doctors and specialists, and get the best healthcare advice and treatment tailored to your needs."
        </p>
      </div>
    </div>
  );
};

export default AppointmentBookingForm;
