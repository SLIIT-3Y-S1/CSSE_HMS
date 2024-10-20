
"use client";

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/lib/apis/payment';
import { useRouter } from 'next/navigation';
import { useAppointments } from '@/context/AppointmentsContext';

interface PaymentFormProps {
  param: {
    id: number;
    amount: number;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ param: { id ,amount} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const router = useRouter();
  const { updateAppointmentStatus } = useAppointments();

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setPaymentStatus(null);

    try {
      const { clientSecret } = await createPaymentIntent({
        amount : amount * 1000, 
        currency: 'usd',
      });


      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage('Card details are not filled in.');
        setIsProcessing(false);
        return;
      }


      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment.');
      } else if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('Payment succeeded!');
        updateAppointmentStatus(id, 'Paid'); 
        await saveTransaction();
        router.push('/payment-management/list'); 
      } else {
        setPaymentStatus('Payment is still processing, please wait...');
      }
    } catch (error) {
      setErrorMessage('Error creating payment intent. Please try again.');
    } finally {
      setIsProcessing(false); 
    }
  };

  const saveTransaction = async () => {
    const transaction = {
      paymentId: id.toString(),
      amount,
      status: 'Paid',
      paymentMethod: 'stripe',
    }
    try {
      const response = await fetch('http://localhost:5500/api/v1/payment/save-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Error saving transaction');
      }
    } catch (error) {
      console.error('Error saving transaction', error);
    }
  }
  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {paymentStatus && <p className="text-green-500">{paymentStatus}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay ${amount}`}
      </button>
      {isProcessing && <p className="text-gray-500 text-sm">Processing payment, please wait...</p>}
    </form>
  );
};

export default PaymentForm;
