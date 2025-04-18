 import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from '../CheckOutForm/CheckOutForm';

const stripePromise=loadStripe('pk_test_51OFj8sLwl5tXPPRvXp4WU3k8YovunNSyk6zAtSss3mmtJgvrAI8xn5iFuys5eeF0qfhlJ4A9vdCvbKbJDYo1q3Gv00BdlYgTb4');
const Payment = () => {
    return (<>
        <div>
            <h3>payment page</h3>
        </div>
        <Elements stripe={stripePromise}>
            <CheckOutForm/>
        </Elements>
        </>);
};

export default Payment;// Updated
