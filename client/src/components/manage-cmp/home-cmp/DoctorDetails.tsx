"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createDoctorDetails, fetchDoctorDetails, updateDoctorDetails } from "@/lib/apis/doctor-api";

const DoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      specialization: "",
      contact: "",
      email: "",
      address: "",
    });
    const [isEditing, setIsEditing] = useState(false);
  
    const fetchDetails = async () => {
      const userID = localStorage.getItem("userID");
      try {
        const data = await fetchDoctorDetails(userID);
        setDoctorDetails(data);
        setFormData(data); // Populate form data with fetched details
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
  
    useEffect(() => {
      fetchDetails();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userID = localStorage.getItem("userID");
      try {
        await createDoctorDetails({ ...formData, userID });
        alert("Details submitted successfully!");
        setIsEditing(false);
        // Optionally, refetch the doctor details to update the state
      } catch (error) {
        console.error("Error submitting doctor details:", error);
      }
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      const userID = localStorage.getItem("userID");
      try {
        await updateDoctorDetails(userID, formData);
        alert("Details updated successfully!");
        setIsEditing(false);
        fetchDetails();
        // Optionally, refetch the doctor details to update the state
      } catch (error) {
        console.error("Error updating doctor details:", error);
      }
    };
  
    const handleBack = () => {
      window.location.href = "/record-management";
    };

  if (doctorDetails && !isEditing) {
    return (
      <div>
        <h2 className="text-3xl font-normal text-gray-500 py-5">
          Welcome Doctor !{" "}
        </h2>
        <div className="flex flex-row w-full border-l-blue-700 shadow-md rounded-lg border-l-[6px] border-transparent bg-white px-7 py-8 md:p-9">
          {/*Profile Icon */}
          <div className="flex">
            <div className="w-[138px] h-[133px] pt-[47px] pb-[46px] bg-[#3758f9]">
              <div className="text-center text-[#f8f8f8] text-[28px] font-semibold leading-10">
                {doctorDetails.firstname[0] + doctorDetails.lastname[0]}
              </div>
            </div>
          </div>

          {/*Patient Primary Details */}
          <div className="flex ml-5 flex-col w-full">
            <div className="text-xl font-bold text-black">
              {doctorDetails.firstname + " " + doctorDetails.lastname}
            </div>
            <div className="flex flex-row mt-4">
              <div className="flex flex-col mr-12">
                <div className="flex flex-row mt-1">
                  <div className="flex text-sm text-gray-500">
                    Specialization
                  </div>
                  <div className="flex text-sm ml-4 text-black font-medium">
                    {doctorDetails.specialization}
                  </div>
                </div>
                <div className="flex flex-row mt-1">
                  <div className="flex text-sm text-gray-500">
                    Contact Number
                  </div>
                  <div className="flex text-sm ml-4 text-black font-medium">
                    {doctorDetails.contact}
                  </div>
                </div>
                <div className="flex flex-row mt-1">
                  <div className="flex text-sm text-gray-500">Address</div>
                  <div className="flex text-sm ml-4 text-black font-medium">
                    {doctorDetails.address}
                  </div>
                </div>
                <div className="flex flex-row mt-1">
                  <div className="flex text-sm text-gray-500">
                    Contact Email
                  </div>
                  <div className="flex text-sm ml-4 text-black font-medium">
                    {doctorDetails.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Patient Unique Code */}
          <div className="flex text-right items-end">
            <div className="flex flex-row mt-1">
              <button
                className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {doctorDetails ? "Edit Your Details" : "Fill Out Your Details"}
        </h2>
        <form
          onSubmit={doctorDetails ? handleUpdate : handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {doctorDetails ? "Update" : "Submit"}
          </button>
          {doctorDetails && (
            <button
              type="button"
              onClick={handleBack}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2"
            >
              Back
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default DoctorDetails;
