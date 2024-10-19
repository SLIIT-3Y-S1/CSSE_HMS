"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { fetchPatients } from "@/lib/services/ehr-service";

const ManageEHRPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchPatientsData = async () => {
    const data = await fetchPatients();
    setPatients(data);
  };
  useEffect(() => {
    fetchPatientsData();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.NIC.includes(searchTerm)
  );

  return (
    <div className="flex-col">
      <div className="text-3xl text-gray-500">Patient Health Records</div>
      <div className="flex flex-row-reverse">
        <div className="flex mb-5 px-3 py-3 rounded-md border-2 border-gray-300 overflow-hidden w-1/5">
          <input
            type="text"
            placeholder="Search for a patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
          <FaSearch className="text-gray-600" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-700 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                First Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Last Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                NIC
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Contact
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {filteredPatients.map((patient) => (
              <tr key={patient.NIC} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">{patient.firstname}</td>
                <td className="p-4 text-sm text-black">{patient.lastname}</td>
                <td className="p-4 text-sm text-black">{patient.NIC}</td>
                <td className="p-4 text-sm text-black">{patient.contact}</td>
                <td className="p-4">
                  <button className="mr-4 flex text-blue-500 hover:text-blue-700 fill-blue-500 hover:fill-blue-700">
                    <div className="mr-2">View</div>
                    <FaEdit className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEHRPage;
