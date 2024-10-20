"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { fetchMedicalRecordByID, updateMedicalRecord } from "@/lib/apis/ehr-api";

function TreatmentPlan({ rid }) {
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTreatmentPlan = async () => {
      try {
        const medicalRecord = await fetchMedicalRecordByID(rid);
        setTreatmentPlan(medicalRecord.treatmentPlan || "");
      } catch (error) {
        console.error("Error fetching treatment plan:", error);
      }
    };

    fetchTreatmentPlan();
  }, [rid]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateMedicalRecord(rid, { treatmentPlan });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating treatment plan:", error);
    }
  };

  return (
    <div className="flex-col border-blue-700 w-1/2 shadow-md flex rounded-lg border bg-white p-5">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-gray-900 font-bold rounded-md">Treatment Plan</div>
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
            Enter Treatment Plan
          </label>
          <textarea
            rows={5}
            placeholder="Enter treatment plan"
            className="w-full border-gray-300 rounded-md"
            value={treatmentPlan}
            onChange={(e) => setTreatmentPlan(e.target.value)}
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

export default TreatmentPlan;