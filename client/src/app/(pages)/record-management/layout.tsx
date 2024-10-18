"use client";

import Breadcrumb from "@/components/manage-cmp/Breadcrumb";
import Sidenav from "@/components/manage-cmp/Sidenav";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isSideBarOpen, setSideBarOpen] = useState(true);

  const handleOpen = () => {
    setSideBarOpen(true);
  };

  const handleClose = () => {
    setSideBarOpen(false);
  };

  return (
    <div
      className={`${isSideBarOpen ? " main-container" : "side-nav-closed"}`}
    >
      <Sidenav onClick={handleClose} isOpen={isSideBarOpen} />
      <div className="flex navbar shadow-md">

        {!isSideBarOpen && (
          <div className="flex items-center ml-2">
            <button
              className="flex justify-center p-2 rounded-md text-black hover:bg-gray-300 focus:outline-none"
              onClick={handleOpen}
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="ml-10 flex items-center"> <Breadcrumb /> </div>
      </div>
      <div className="maincontent">{children}</div>
    </div>
  );
}
