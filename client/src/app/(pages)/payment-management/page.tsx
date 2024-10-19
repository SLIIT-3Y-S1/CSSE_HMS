

"use client";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/payment-management/PaymentForm';
import { useSearchParams } from 'next/navigation';
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Stripe public key not found');
}
const stripePromise = loadStripe(stripePublicKey);



const PaymentHomePage = ( ) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string, 10)
   : null;
   const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount') as string, 10): null;
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Complete Your Payment</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm param={{
            id: id !== null ? id : 0,
            amount: amount !== null ? amount : 0
          }}  />
        </Elements>
      </div>
    </div>
  );
};


export default PaymentHomePage

