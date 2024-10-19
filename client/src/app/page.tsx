'use client';
import Image from "next/image";
import HomePage from "./(pages)/(common)/page";
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [userID, setUserID] = useState<string | null>(null);
  
  const getUserID = () => {
    // Try to get the userID from localStorage
    let userID = localStorage.getItem('userID');
    setUserID(userID);
    
    // If not found in localStorage
    if (!userID) {
      window.location.href = '/login'; 
    }

    // If still not found, return a default value or handle accordingly
    return userID || 'default-user-id';
  };

  useEffect(() => {
    getUserID();
  }, []);
  

  return (
    
    <HomePage />
    
  );
}
