import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hook/useAxiosSecure';



const CheckOutForm = ({price,name}) => {
   const membership_prices=price;
   const package_array=name.split(" ");
   const package_name=package_array[0];
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId,setTransactionId]=useState("");
    const {user}=useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError]=useState('');
    const axiosSecure=useAxiosSecure();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (membership_prices > 0) {
                axiosSecure.post("/create-payment-intent", {
                    price: membership_prices})
                .then((res) =>{
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
                }
                );
        }
      }, [axiosSecure,membership_prices]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setError(error.message);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          setError('');
        }

        //confirm card-payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email:user?.email,  
                  name: user?.displayName
                }
              }
            }
          );
          if(confirmError){
            console.log('confirm error',confirmError);
          }
          else{
            console.log('payment intent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id',paymentIntent.id);
                setTransactionId(paymentIntent.id);
                                // now save the payment in the database
                                const payment = {
                                    email: user.email,
                                    price: membership_prices,
                                    transactionId: paymentIntent.id,
                                    status: 'pending'
                                }
                                const res = await axiosSecure.post('/payments', payment);
                                console.log('payment saved', res.data);
                                if (res.data?.paymentResult?.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Payment completed",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // navigate('/dashboard/paymentHistory')
                                    const res=axiosSecure.put(`/users/${user.email}`,{
                                      badge:package_name
                                    })
                                    console.log(res.data);
                                    
                                }
            }
          }
      };
    return (

        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn w-full my-4 btn-primary' type="submit" disabled={!stripe || !clientSecret}>
          Pay ${membership_prices}
        </button>
        <p className='text-red-300'>{error}</p>
        {transactionId && <p className='text-green-300'>your transactionid:{transactionId}</p>}
      </form>
    );
};

export default CheckOutForm;// Updated
