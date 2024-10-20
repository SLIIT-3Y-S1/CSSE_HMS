"use client";

import Diagnosis from "@/components/manage-cmp/medical-record-cmp/Diagnosis";
import TreatmentPlan from "@/components/manage-cmp/medical-record-cmp/TreatmentPlan";
import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import { fetchMedicalRecordByID, fetchPatientById } from "@/lib/apis/ehr-api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";

function page() {
  /*-------Constants and States-------*/

  //patient id from url parameters
  const searchParams = useSearchParams();
  const pid = searchParams.get("pid");
  const rid = searchParams.get("rid");

  //primary data
  const [primaryData, setPrimaryData] = useState(null);
  
  //medical record data
  const [medicalRecordData, setMedicalRecordData] = useState(null);

  //logged in UserID
  const [userID, setUserID] = useState<string | null>(null);

  //loading state
  const [loading, setLoading] = useState(true);

  const fetchPrimaryData = async () => {
    try {
      const dataprimary = await fetchPatientById(pid);
      setPrimaryData(dataprimary);
    } catch (error) {
      console.error("Error fetching all patient data:", error);
    }
  };

  const fetchMedicalRecordData = async () => {
    try {
      const data = await fetchMedicalRecordByID(rid);
      setMedicalRecordData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching medical record data:", error);
    }
  }

  const getUserID = () => {
    try {
      let userID = localStorage.getItem("userID");
      setUserID(userID);
      //console.log("UserID from local storage:", userID);
    } catch (error) {
      console.error("Error getting userID from local storage:", error);
    }
  };

  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      getUserID();
      await fetchPrimaryData();
      await fetchMedicalRecordData();
      setLoading(false);
      //console.log(pid);
      //console.log(rid);
    };
    fetchData();
  }, []);
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
      {/*Header Section*/}
      {medicalRecordData ? (
          <>
          <div className="mt-5 text-2xl font-medium text-gray-700">
            Patient Medical Record
          </div>
            <div className="mt-5 flex flex-row text-gray-800 text-sm">
              <div>Date Created</div>
              <div className="ml-10 text-black font-bold">{extractDate(medicalRecordData.createdAt)}</div>
            </div>
            <div className="mt-1 flex flex-row text-gray-800 text-sm">
              <div>Doctor in charge</div>
              <div className="ml-4 text-black font-bold">
                Dr. {medicalRecordData.Doctor.firstname} {medicalRecordData.Doctor.lastname}
              </div>
            </div>
          </>
        ) : (
          <p>Loading medical record data...</p>
        )}

      <div className="flex flex-row justify-between mt-5">
        {/*Diagnosis*/}
        <Diagnosis rid = {rid}/>
        {/*Spacer Div*/}
        <div className="p-2"></div>
        {/*Treatment plan*/}
        <TreatmentPlan rid = {rid}/>
      </div>

      <div className="flex-col mt-5 w-full border-blue-700 shadow-md flex rounded-lg border bg-white p-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex text-gray-900 font-bold rounded-md">
            Medical Prescription
          </div>
        </div>
        <div className="flex mt-5">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Medication Name</th>
                <th>Quantity(tablets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Losartan</td>
                <td>30</td>
                <td className="text-left">
                  <button className="text-blue-600 hover:text-blue-900">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900 ml-4">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;
