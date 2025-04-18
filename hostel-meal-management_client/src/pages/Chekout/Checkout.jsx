
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckOutForm from '../CheckOutForm/CheckOutForm';
import Header from '../Home/Shared/Header';

const stripePromise=loadStripe('pk_test_51OFj8sLwl5tXPPRvXp4WU3k8YovunNSyk6zAtSss3mmtJgvrAI8xn5iFuys5eeF0qfhlJ4A9vdCvbKbJDYo1q3Gv00BdlYgTb4');
const Checkout = () => {
    const {_id,name,price,description,image}=useLoaderData();
    console.log(_id);
    return (
        <div>
            <Header/>
        <div>
            <div className="hero" style={{backgroundImage: `url(${image})`,height:'550px',backgroundPosition:'center top' ,backgroundRepeat:'no-repeat'}}>
            <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl uppercase font-bold text-yellow-200">{name}</h1>
                    <h1 className="mb-5 text-2xl uppercase font-bold text-yellow-200">Price: ${price}</h1>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
            <div className='mt-24 lg:mx-64 mx-4'>
                  <p className='mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left'> {description}</p>

                  <Elements stripe={stripePromise}>
                      <CheckOutForm price={price} name={name}></CheckOutForm>
                 </Elements>

            {/* <div className=' py-3 ' >
                <Link className=' btn w-full bg-blue-900 md:text-3xl text-base text-center font-bold text-white' to='/payment'>Make payment</Link>
            </div> */}
            </div>
            
            
        </div>
        </div>
    );
};

export default Checkout;// Updated
