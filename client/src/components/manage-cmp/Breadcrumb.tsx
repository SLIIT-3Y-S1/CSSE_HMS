"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCube } from "react-icons/fa";


const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <>
      <FaCube className="mr-2" />
      <ul className="flex items-center">
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <Link href={href} className="flex items-center text-base font-medium hover:text-primary text-dark">
                {path}
              </Link>
            </li>
          );
        })}
      </ul>
    </>

  );
};

export default Breadcrumb;