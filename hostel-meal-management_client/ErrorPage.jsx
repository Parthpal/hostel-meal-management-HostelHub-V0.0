import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        
            <div className='text-center my-20' id="error-page">
            <h1 className='text-5xl'>Oops!</h1>
            
            <img className='w-96 max-h-96 mx-auto' src="https://i.ibb.co/f0bF43p/404-error-with-a-landscape-bro.png" alt="error" srcset="" />
            <p className='text-2xl'>
                <i>{error.statusText || error.message}</i>

            </p>
            <button></button>
            <Link className='btn btn-primary text-white' to='/'>Back To Home</Link>
            </div>
        
    );
};

export default ErrorPage;// Updated
