"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiMedicines } from "react-icons/gi";
import { RiAdminFill, RiHealthBookFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { GrAnalytics } from "react-icons/gr";
import { MdAnalytics } from "react-icons/md";

interface SidenavProps {
  onClick: () => void;
  isOpen: boolean;
}

function Sidenav({ onClick, isOpen }: SidenavProps) {
  const pathname = usePathname();
  // Function to check if the current route is active
  const isActive = (path: string) => pathname === path;
  const [dropDown, setDropDown] = useState(false);

  function toggleDropDown() {
    setDropDown(!dropDown);
  }

  //if (!isOpen) return null;
  //else {
  return (
    <>
      <div
        className={`sidenav font-semibold text-gray-500 transition-all duration-1000 ease-in-out ${
          isOpen ? "w-[300px]" : "w-0 overflow-hidden"
        }`} /* Apply transition on width */
      >
        <nav className="bg-[#F8F8F8] h-full py-6 px-4 flex flex-col relative">
          <h2>CSSE HMS</h2>
          <button
            onClick={onClick}
            className="absolute top-4 right-4  hover:text-red-600"
          >
            {" "}
            <FaTimes />
          </button>

          <ul className="space-y-3 flex-1 mt-6">
            <li>
              <Link
                href="/record-management"
                className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                  isActive("/record-management")
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <IoMdHome className="text-xl mr-2" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/record-management/ehr"
                className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                  isActive("/record-management/ehr")
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <RiHealthBookFill className="text-xl mr-2" />
                <span>Patient Records</span>
              </Link>
            </li>
            <li>
              <Link
                href="/record-management/inventory"
                className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                  isActive("/record-management/inventory")
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <GiMedicines className="text-xl mr-2" />
                <span>Inventory</span>
                <span className=" hover:text-[#077fbb] text-sm flex items-center hover:bg-gray-200 rounded px-4 py-3 transition-all"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/record-management/analytics"
                className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                  isActive("/record-management/analytics")
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
               <MdAnalytics className="text-xl mr-2" />
                <span>Hospital Analytics</span>
                <span className=" hover:text-[#077fbb] text-sm flex items-center hover:bg-gray-200 rounded px-4 py-3 transition-all"></span>
              </Link>
            </li>

            <li>
              <button
                className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                  isActive("/record-management/administrator/user-manage") ||
                  isActive("/record-management/administrator/role-manage")
                    ? "text-[#077fbb]"
                    : "hover:bg-gray-200"
                }`}
                type="button"
                onClick={toggleDropDown}
              >
                <RiAdminFill className="text-xl mr-2" />
                <span>Administrator</span>
              </button>
            </li>
            {dropDown && (
              <div className="ml-10">
                <li>
                  <Link
                    href="/record-management/administrator/user-manage"
                    className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                      isActive("/record-management/administrator/user-manage")
                        ? "bg-blue-200"
                        : "hover:bg-gray-200"
                    }`}
                  >
                  
                    <span>User Management</span>
                    <span className=" hover:text-[#077fbb] text-sm flex items-center hover:bg-gray-200 rounded px-4 py-3 transition-all"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/record-management/administrator/role-manage"
                    className={` hover:text-[#077fbb] text-sm flex items-center rounded px-4 py-3 transition-all ${
                      isActive("/record-management/administrator/role-manage")
                        ? "bg-blue-200"
                        : "hover:bg-gray-200"
                    }`}
                  >
                   
                    <span>Role Management</span>
                    <span className=" hover:text-[#077fbb] text-sm flex items-center hover:bg-gray-200 rounded px-4 py-3 transition-all"></span>
                  </Link>
                </li>
              </div>
            )}
          </ul>

          <div className=" align-bottom">
            <div className=" border-t-2 border-gray-300 mt-4">
              <ul className="inset-x-0 bottom-0">
                <li>
                  <Link
                    href="/record-management/logout"
                    className=" hover:text-[#077fbb] text-sm flex items-center hover:bg-gray-200 rounded px-4 py-3 transition-all"
                  >
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
