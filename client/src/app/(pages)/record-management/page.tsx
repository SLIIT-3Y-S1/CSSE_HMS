"use client";

import Breadcrumb from "@/components/manage-cmp/Breadcrumb";
import AdminDetails from "@/components/manage-cmp/home-cmp/AdminDetails";
import DoctorDetails from "@/components/manage-cmp/home-cmp/DoctorDetails";
import React, { useEffect, useState } from "react";

const RecordManagementHomePage = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  return (
    <div>
      {role === 'doctor' && <DoctorDetails />}
      {role === 'admin' && <AdminDetails />}
      {/* Add more role-based components if needed */}
    </div>
  );
};

export default RecordManagementHomePage;
