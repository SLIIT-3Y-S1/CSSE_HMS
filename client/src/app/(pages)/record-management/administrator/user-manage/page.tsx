"use client";

import Modal from "@/components/manage-cmp/Modal";
import { fetchUsers, registerUser } from "@/lib/apis/admin-apt";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";

function page() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });

  // Handle input change in the form
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData({ username: "", email: "", password: "", role: "" });
    setIsModalOpen(false);
  };

  // Handle form submission to create a doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData); // Call to backend API
      console.log("Doctor registered successfully:", response);
      // Reset form and hide modal
      handleCloseModal();
      fetchUsersData();
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  const fetchUsersData = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const filteredUsers = users.filter(
    (users) =>
      users.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.createdAt.includes(searchTerm)
  );

  return (
    <div className="flex-col">
      <div className="text-3xl text-gray-500">User Management</div>
      <div className="flex flex-row mt-5 justify-between">
        <button
          className="bg-blue-600 rounded-md h-12 px-3 text-center text-base font-medium text-white hover:bg-[#1B44C8]"
          onClick={handleOpenModal}
        >
          Add New User
        </button>

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

      {/* Modal */}
      <div>
        <Modal
          title={"Modal Title"}
          content={
            <div className="flex w-full">
              <form className="flex-col w-full" onSubmit={handleSubmit}>
                <div className="flex flex-row">
                  <label className="px-4 py-2 text-lg font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username" // Added name attribute
                    placeholder="Enter the username"
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row">
                  <label className="px-4 py-2 text-lg font-medium">Email</label>
                  <input
                    type="email"
                    name="email" // Added name attribute
                    placeholder="Enter the email"
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row">
                  <label className="px-4 py-2 text-lg font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password" // Added name attribute
                    placeholder="Enter the default password"
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row">
                  <label className="px-4 py-2 text-lg font-medium">
                    Select User role
                  </label>
                  <select
                    name="role" // Added name attribute
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                    value={formData.role}
                    onChange={handleInputChange}
                    defaultValue={'Select Role'}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
                <div className="border-t border-gray-300 pt-6 flex justify-end gap-4"></div>
                <div className="flex flex-row-reverse w-full">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          }
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      </div>
      {/* Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-700 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                Username
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Email
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Role
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                CreatedAt
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {filteredUsers.map((users) => (
              <tr key={users.NIC} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">{users.username}</td>
                <td className="p-4 text-sm text-black">{users.email}</td>
                <td className="p-4 text-sm text-black">{users.role}</td>
                <td className="p-4 text-sm text-black">{users.createdAt}</td>
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
}

export default page;
