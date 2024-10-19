// lib/apis/payment.ts
export async function createPaymentIntent(paymentDetails: { amount: number, currency: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/create-payment-intent`
        , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }
  
    return await response.json();
  }
  