"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import { fetchMedicalRecordByID, updateMedicalRecord } from "@/lib/apis/ehr-api";

function Diagnosis({ rid }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const medicalRecord = await fetchMedicalRecordByID(rid);
        setDiagnosis(medicalRecord.diagnosis || "");
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      }
    };

    fetchDiagnosis();
  }, [rid]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateMedicalRecord(rid, { diagnosis });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating diagnosis:", error);
    }
  };

  return (
    <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-gray-900 font-bold rounded-md">Diagnosis</div>
        <div className="flex">
          <button
            className="flex flex-row text-green-600 hover:text-green-900"
            onClick={handleEditClick}
          >
            Edit <FaEdit className="ml-1 text-xl" />
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
            placeholder="Enter diagnosis"
            className="w-full border-gray-300 rounded-md"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              type="button"
              className="flex flex-row text-blue-600 hover:text-blue-900 mt-2"
              onClick={handleSaveClick}
            >
              Save <FaEdit className="ml-1 text-xl" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Diagnosis;