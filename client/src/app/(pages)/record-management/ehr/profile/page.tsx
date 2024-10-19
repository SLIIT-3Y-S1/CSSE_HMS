"use client";

import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import { fetchPatientById } from "@/lib/apis/ehr-api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";

function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [primaryData, setPrimaryData] = useState(null);
  
  const extractDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const fetchPrimaryData = async () => {
    try {
      const dataprimary = await fetchPatientById(id);
      setPrimaryData(dataprimary);
    } catch (error) {
      console.error("Error fetching all patient data:", error);
    }
  };

  const fetchPatientExtra = async () => {
    try {
      const dataprimary = await fetchPatientById(id);
      setPrimaryData(dataprimary);
    } catch (error) {
      console.error("Error fetching all patient data:", error);
    }
  };

  useEffect(() => {
    fetchPrimaryData();
  }, []);

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
        {/*Immunizations*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Allergies
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
        {/*Alergies*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Immunizations
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
                  <td>Immunization name goes here</td>
                  <td className="text-right">
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
