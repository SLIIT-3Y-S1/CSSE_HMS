import { fetchDoctorDetails } from "@/lib/apis/doctor-api";
import { createMedicalRecord, fetchMedicalRecordsByPatientID } from "@/lib/apis/ehr-api";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";

function PatientMedicalRecordsList({ userID, patientID, medicalRecordsList }) {
  const router = useRouter();
  const [records, setRecords] = useState(medicalRecordsList);

  useEffect(() => {
    setRecords(medicalRecordsList);
  }, [medicalRecordsList]);

  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const handleViewRecord = (recordID) => () => {
    router.push(`profile/medical-record?pid=${patientID}&rid=${recordID}`);
  };

  const fetchMedicalRecords = async () => {
    try {
      const medicalRecordsList = await fetchMedicalRecordsByPatientID(patientID);
      setRecords(medicalRecordsList);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  const createNewMedicalRecord = async () => {
    if (confirm("Are you sure you want to create a new medical record?")) {
      try {
        const data = await fetchDoctorDetails(userID);
        const doctorID = data.doctorID;
        await createMedicalRecord(patientID, doctorID);
        await fetchMedicalRecords(); // Refetch the data
      } catch (error) {
        console.error("Error creating medical record:", error);
      }
    }
  };

  return (
    <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-gray-900 font-bold rounded-md">
          Medical Records
        </div>
        <div className="flex">
          <button
            className="flex flex-row text-green-600 hover:text-green-900"
            onClick={createNewMedicalRecord}
          >
            Add <RiAddBoxFill className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex mt-5">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Doctor In Charge</th>
              <th>Date Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.recordID}>
                <td>
                  {"Dr." +
                    record.Doctor.firstname +
                    " " +
                    record.Doctor.lastname}
                </td>
                <td>{extractDate(record.createdAt)}</td>
                <td className="text-right">
                  <button
                    className="inline-flex text-blue-600 hover:text-blue-900"
                    onClick={handleViewRecord(record.recordID)}
                  >
                    View <FaEdit className="mt-1 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientMedicalRecordsList;