// pages/billing.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BillingPage = () => {
  const billingDetails = {
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const idParam = searchParams.get('id');
  const titleParam = searchParams.get('title');
  const amountParam = searchParams.get('amount');
  const statusParam = searchParams.get('status');

  const handlePayNow = () => {
    
    if (idParam && amountParam) {
      const query = new URLSearchParams({id: idParam, amount:amountParam}).toString();
      // Navigate to the payment page with the appointment ID
      router.push(`/payment-management?${query}`);
    }
  };

  return (
    <div className="billing-page">
      <h1>Billing Details</h1>
      <div className="billing-details">
        <p><strong>Appointment Title:</strong> {titleParam || 'N/A'}</p>
        <p><strong>Patient Name:</strong> {billingDetails.patientName}</p>
        <p><strong>Doctor Name:</strong> {billingDetails.doctorName}</p>
        <p><strong>Total Amount:</strong> ${amountParam}</p>
        <p><strong>Status:</strong> {statusParam || 'Unknown'}</p>
      </div>
      <button className="pay-now-button" onClick={handlePayNow}>
        Pay Now
      </button>

      <style jsx>{`
        .billing-page {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        .billing-details {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .billing-details p {
          margin: 8px 0;
        }
        .pay-now-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .pay-now-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default BillingPage;
