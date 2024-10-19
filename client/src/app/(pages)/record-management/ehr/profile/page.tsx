"use client";

import PatientAllergies from "@/components/manage-cmp/patient-profile-cmp/PatientAllergies";
import PatientImmunizations from "@/components/manage-cmp/patient-profile-cmp/PatientImmunizations";
import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import { fetchAllergiesByPatientID, fetchImmunizationsByPatientID, fetchPatientById } from "@/lib/apis/ehr-api";
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

  //loading state
  const [loading, setLoading] = useState(true);
  
  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  /*-------Functions-------*/

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
  }

  const fetchImmunizations = async () => {
    try {
      const immunization = await fetchImmunizationsByPatientID(id);
      setImmunizations(immunization);
      console.log(immunization);
    } catch (error) {
      console.error("Error fetching allergies:", error);
    }
  }

  /*-------Use Effect - On Page Load -------*/

  useEffect(() => {
    const fetchData = async () => {
      await fetchPrimaryData();
      await fetchAllergies();
      await fetchImmunizations();
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
          DOB={ extractDate(primaryData.dob)}
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
        <PatientAllergies allergiesData={allergies} patientID={id}/>
        {/*Spacer Div*/}
        <div className="p-2"></div>
        {/*Immunizations*/}
        <PatientImmunizations immunizationsData={immunizations} patientID={id}/>
      </div>

      {/*Medical Records and Appointment History*/}
      <div className="flex flex-row h-auto justify-between mt-5">
        {/*Medical Records*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Medical Records
            </div>
            <div className="flex">
              <button className="flex flex-row text-green-600 hover:text-green-900">
                Add <RiAddBoxFill className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex mt-5">
            <table className="w-full">
              <tbody>
                <tr>
                  <td>Allergy name goes here</td>
                  <td className="text-right">
                    {" "}
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
