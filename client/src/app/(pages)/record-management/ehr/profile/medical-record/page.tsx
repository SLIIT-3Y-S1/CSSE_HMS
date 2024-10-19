"use client";

import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import { fetchPatientById } from "@/lib/apis/ehr-api";
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
      setLoading(false);
      console.log(pid);
      console.log(rid);
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
      <div className="mt-5 flex flex-col">
        <div className="flex text-gray-700 text-2xl">
          Patient Medical Health Record
        </div>
        <div className="mt-5 flex flex-row text-gray-800 text-sm">
          <div>Date Created</div>
          <div className="ml-10 text-black font-bold">10/20/2024</div>
        </div>
        <div className="mt-1 flex flex-row text-gray-800 text-sm">
          <div>Doctor in charge</div>
          <div className="ml-4 text-black font-bold">Dr.Sanjitha Lakmali</div>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-5">
        {/*Diagnosis*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Diagnosis
            </div>
            <div className="flex">
              <button className="flex flex-row text-green-600 hover:text-green-900">
                Add <RiAddBoxFill className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex-row w-full mt-5">
            <form>
              <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Enter Diagnosis
              </label>
              <textarea
                rows={5}
                placeholder="Default textarea"
                className=" w-full border-gray-300 rounded-md"
                value={"Diagnosis goes here"}
              />

              <button className="flex flex-row text-blue-600 hover:text-blue-900">
                Edit <FaEdit className="ml-1 text-xl" />
              </button>
            </form>
          </div>
        </div>
        {/*Spacer Div*/}
        <div className="p-2"></div>
        {/*Treatment plan*/}
        <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-gray-900 font-bold rounded-md">
              Treatment Plan
            </div>
            <div className="flex">
              <button className="flex flex-row text-green-600 hover:text-green-900">
                Add <RiAddBoxFill className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex-row w-full mt-5">
            <form>
              <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Enter Diagnosis
              </label>
              <textarea
                rows={5}
                placeholder="Default textarea"
                className=" w-full border-gray-300 rounded-md"
                value={"Treatment plan goes here"}
              />

              <button className="flex flex-row text-blue-600 hover:text-blue-900">
                Edit <FaEdit className="ml-1 text-xl" />
              </button>
            </form>
          </div>
        </div>
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
