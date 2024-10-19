"use client";

import PatientAllergies from "@/components/manage-cmp/patient-profile-cmp/PatientAllergies";
import PatientImmunizations from "@/components/manage-cmp/patient-profile-cmp/PatientImmunizations";
import PatientMedicalRecordsList from "@/components/manage-cmp/patient-profile-cmp/PatientMedicalRecordsList";
import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import {
  fetchAllergiesByPatientID,
  fetchImmunizationsByPatientID,
  fetchMedicalRecordsByPatientID,
  fetchPatientById,
} from "@/lib/apis/ehr-api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";

function page() {
  /*-------Constants and States-------*/

  //patient id from url parameters
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //primary data
  const [primaryData, setPrimaryData] = useState(null);

  //allergies
  const [allergies, setAllergies] = useState([]);

  //immunizations
  const [immunizations, setImmunizations] = useState([]);

  //medical records
  const [medicalRecords, setMedicalRecords] = useState([]);

  //logged in UserID
  const [userID, setUserID] = useState<string | null>(null);

  //loading state
  const [loading, setLoading] = useState(true);

  /*-------Functions-------*/

  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const getUserID = () => {
    try {
      let userID = localStorage.getItem("userID");
      setUserID(userID);
      //console.log("UserID from local storage:", userID);
    } catch (error) {
      console.error("Error getting userID from local storage:", error);
    }
  };

  const fetchPrimaryData = async () => {
    try {
      const dataprimary = await fetchPatientById(id);
      setPrimaryData(dataprimary);
    } catch (error) {
      console.error("Error fetching all patient data:", error);
    }
  };

  const fetchAllergies = async () => {
    try {
      const allergies = await fetchAllergiesByPatientID(id);
      setAllergies(allergies);
      //console.log(allergies);
    } catch (error) {
      console.error("Error fetching allergies:", error);
    }
  };

  const fetchImmunizations = async () => {
    try {
      const immunization = await fetchImmunizationsByPatientID(id);
      setImmunizations(immunization);
      //console.log(immunization);
    } catch (error) {
      console.error("Error fetching allergies:", error);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const medicalRecordsList = await fetchMedicalRecordsByPatientID(id);
      setMedicalRecords(medicalRecordsList);
      //console.log(medicalRecordsList);
    } catch (error) {
      console.error("Error fetching allergies:", error);
    }
  };

  /*-------Use Effect - On Page Load -------*/

  useEffect(() => {
    const fetchData = async () => {
      getUserID();
      await fetchPrimaryData();
      await fetchAllergies();
      await fetchImmunizations();
      await fetchMedicalRecords();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {primaryData ? (
        <PatientProfileBanner
          FirstName={primaryData.firstname}
          LastName={primaryData.lastname}
          UniqueCode={primaryData.uniqueCode}
          NIC={primaryData.NIC}
          DOB={extractDate(primaryData.dob)}
          Age={primaryData.age}
          Address={primaryData.address}
          Contact={primaryData.contact}
        />
      ) : (
        <p>Loading...</p>
      )}
      {/*Immunizations and Alergies*/}
      <div className="flex flex-row justify-between mt-5">
        {/*Alergies*/}
        <PatientAllergies allergiesData={allergies} patientID={id} />
        {/*Spacer Div*/}
        <div className="p-2"></div>
        {/*Immunizations*/}
        <PatientImmunizations
          immunizationsData={immunizations}
          patientID={id}
        />
      </div>
      {/*Medical Records and Appointment History*/}
      <div className="flex flex-row h-auto justify-between mt-5">
        {/*Medical Records*/}
        <PatientMedicalRecordsList
          userID={userID}
          patientID={id}
          medicalRecordsList={medicalRecords}
        />
        {/*Spacer Div*/}
        <div className="p-2"></div>
        {/*Appointment History*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Appointment History
            </div>
          </div>
          <div className="flex mt-5">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10/10/2024</td>
                  <td>Dr.Doctor Name</td>
                  <td>1.30 pm</td>
                  <td className="text-left">
                    <button className="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
