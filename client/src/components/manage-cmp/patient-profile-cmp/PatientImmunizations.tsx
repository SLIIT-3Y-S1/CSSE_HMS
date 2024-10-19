"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import Modal from "../Modal";
import {
  createImmunization,
  updateImmunization,
  deleteImmunization,
  fetchImmunizationsByPatientID,
} from "@/lib/apis/ehr-api";

function PatientImmunizations({ patientID, immunizationsData }) {

    
  const [immunizationName, setImmunizationName] = useState("");
  const [immunizationID, setImmunizationID] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [immunizations, setImmunizations] = useState(immunizationsData || []);

  useEffect(() => {
    setImmunizations(immunizationsData);
  }, [immunizationsData]);

  const handleCreateImmunization = () => {
    setIsAddModalOpen(true);
  };

  const handleEditImmunization = (id, name) => {
    setImmunizationName(name);
    setImmunizationID(id);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setImmunizationName("");
    setImmunizationID(null);
  };

  const fetchImmunizations = async () => {
    try {
      const fetchedImmunizations = await fetchImmunizationsByPatientID(
        patientID
      );
      setImmunizations(fetchedImmunizations);
    } catch (error) {
      console.error("Error fetching immunizations:", error);
    }
  };

  const CreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const newImmunization = await createImmunization(
        patientID,
        immunizationName
      );
      setImmunizations([...immunizations, newImmunization]);
      setIsAddModalOpen(false);
      setImmunizationName("");
    } catch (error) {
      console.error("Error creating immunization:", error);
    }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateImmunization(immunizationID, { name: immunizationName });
      setImmunizations(
        immunizations.map((immunization) =>
          immunization.id === immunizationID
            ? { ...immunization, name: immunizationName }
            : immunization
        )
      );
      setIsEditModalOpen(false);
      setImmunizationName("");
      setImmunizationID(null);
    } catch (error) {
      console.error("Error updating immunization:", error);
    }
  };

  const handleDeleteImmunization = async (id) => {
    try {
      await deleteImmunization(Number(id)); // Ensure id is an integer
      await fetchImmunizations(); // Refetch the data
    } catch (error) {
      console.error("Error deleting immunization:", error);
    }
  };

  return (
    <>
      <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex text-gray-900 font-bold rounded-md">
            Immunizations
          </div>
          <div className="flex">
            <button
              className="flex flex-row text-green-600 hover:text-green-900"
              onClick={handleCreateImmunization}
            >
              Add <RiAddBoxFill className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="flex mt-5">
          <table className="w-full">
            <tbody>
              {immunizations.map((immunization) => (
                <tr key={immunization.id}>
                  <td>{immunization.name}</td>
                  <td className="text-right">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() =>
                        handleEditImmunization(
                          immunization.id,
                          immunization.name
                        )
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDeleteImmunization(immunization.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Add Immunization"
        onClose={handleCloseModal}
        isModalOpen={isAddModalOpen}
        content={
          <form onSubmit={CreateSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="immunization_name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Immunization Name
              </label>
              <input
                type="text"
                name="immunization_name"
                id="immunization_name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={immunizationName}
                onChange={(e) => setImmunizationName(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                type="submit"
              >
                Add Immunization
              </button>
            </div>
          </form>
        }
      />
      <Modal
        title="Edit Immunization"
        onClose={handleCloseModal}
        isModalOpen={isEditModalOpen}
        content={
          <form onSubmit={EditSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="immunization_name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Immunization Name
              </label>
              <input
                type="text"
                name="immunization_name"
                id="immunization_name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={immunizationName}
                onChange={(e) => setImmunizationName(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                type="submit"
              >
                Edit
              </button>
            </div>
          </form>
        }
      />
    </>
  );
}

export default PatientImmunizations;
