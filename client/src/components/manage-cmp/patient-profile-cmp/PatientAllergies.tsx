"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import Modal from "../Modal";
import {
  createAllergy,
  updateAllergy,
  deleteAllergy,
  fetchAllergiesByPatientID,
} from "@/lib/apis/ehr-api";

function PatientAllergies({ patientID, allergiesData }) {
  const [allergyName, setAllergyName] = useState("");
  const [allergyID, setAllergyID] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [allergies, setAllergies] = useState(allergiesData || []);

  useEffect(() => {
    setAllergies(allergiesData);
  }, [allergiesData]);

  const handleCreateAllergy = () => {
    setIsAddModalOpen(true);
  };

  const handleEditAllergy = (id, name) => {
    setAllergyName(name);
    setAllergyID(id);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setAllergyName("");
    setAllergyID(null);
  };

  const fetchAllergies = async () => {
    try {
      const fetchedAllergies = await fetchAllergiesByPatientID(patientID);
      setAllergies(fetchedAllergies);
    } catch (error) {
      console.error("Error fetching allergies:", error);
    }
  };

  const CreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAllergy = await createAllergy(patientID, allergyName);
      setAllergies([...allergies, newAllergy]);
      setIsAddModalOpen(false);
      setAllergyName("");
    } catch (error) {
      console.error("Error creating allergy:", error);
    }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAllergy(allergyID, { name: allergyName });
      setAllergies(
        allergies.map((allergy) =>
          allergy.id === allergyID ? { ...allergy, name: allergyName } : allergy
        )
      );
      setIsEditModalOpen(false);
      setAllergyName("");
      setAllergyID(null);
    } catch (error) {
      console.error("Error updating allergy:", error);
    }
  };

  const handleDeleteAllergy = async (id) => {
    try {
      await deleteAllergy(Number(id)); // Ensure id is an integer
      await fetchAllergies(); // Refetch the data
    } catch (error) {
      console.error("Error deleting allergy:", error);
    }
  };

  return (
    <>
      <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex text-gray-900 font-bold rounded-md">
            Allergies
          </div>
          <div className="flex">
            <button
              className="flex flex-row text-green-600 hover:text-green-900"
              onClick={handleCreateAllergy}
            >
              Add <RiAddBoxFill className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="flex mt-5">
          <table className="w-full">
            <tbody>
              {allergies.map((allergy) => (
                <tr key={allergy.id}>
                  <td>{allergy.name}</td>
                  <td className="text-right">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() =>
                        handleEditAllergy(allergy.id, allergy.name)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDeleteAllergy(allergy.id)}
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
        title="Add Allergy"
        onClose={handleCloseModal}
        isModalOpen={isAddModalOpen}
        content={
          <form onSubmit={CreateSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="allergy_name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Allergy Name
              </label>
              <input
                type="text"
                name="allergy_name"
                id="allergy_name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={allergyName}
                onChange={(e) => setAllergyName(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                type="submit"
              >
                Add Allergy
              </button>
            </div>
          </form>
        }
      />
      <Modal
        title="Edit Allergy"
        onClose={handleCloseModal}
        isModalOpen={isEditModalOpen}
        content={
          <form onSubmit={EditSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="allergy_name"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Allergy Name
              </label>
              <input
                type="text"
                name="allergy_name"
                id="allergy_name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={allergyName}
                onChange={(e) => setAllergyName(e.target.value)}
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

export default PatientAllergies;
