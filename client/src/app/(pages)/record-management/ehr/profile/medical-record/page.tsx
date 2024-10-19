import PatientProfileBanner from "@/components/manage-cmp/patient-profile-cmp/PatientProfileBanner";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";

function page() {
  return (
    <div>
      <PatientProfileBanner />

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
