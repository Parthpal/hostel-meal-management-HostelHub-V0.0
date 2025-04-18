import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Header from '../../Home/Shared/Header';
import AllReViewDetails from './AllReViewDetails';
import { useQuery } from '@tanstack/react-query';

const AllReviews = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    
    const {data: reviewFood=[],refetch}=useQuery({
        queryKey:['reviewFood'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/review');
            console.log(res.data);
            return res.data;
        }
    })
    return (<>

        <h3 className='text-3xl text-center font-semibold mb-5 my-10'>All Reviews on Meal</h3>
        { reviewFood.length?<div className="overflow-x-auto w-3/4 text-center container my-10 mx-auto">
        <table className="table mx-auto border-2 border-violet-500">
    {/* head */}
                <thead className='bg-[#E6DFFC] text-black text-center text-base'>
                <tr>
                    <th>Meal Title</th>
                    <th>Number Of Likes</th>
                    <th>Reviews count</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                    reviewFood.map(reviews=><AllReViewDetails refetch={refetch} key={reviews._id} reviews={reviews}></AllReViewDetails>)
                    }

                </tbody>

        </table>
 
    </div>:<>
            
            <h3 className='text-xl text-center text-black'>You did not make any review yet</h3> </>}
           
            </> );
};

export default AllReviews;// Updated
