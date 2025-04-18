import React, { useContext } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';
import Header from '../../Home/Shared/Header';
import RequestedMealDetails from './RequestedMealDetails';

const RequestedMeal = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    

    const {data: requestedFood=[],refetch}=useQuery({
        queryKey:['requestedFood'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/requestFood');
            console.log(res.data);
            return res.data;
        }
    })
    const matchedUserRequest=requestedFood.filter(food=>food.user_email===user.email)
    const sortedmatchedUserRequest = matchedUserRequest.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') {
          return -1;
        } else if (a.status !== 'pending' && b.status === 'pending') {
          return 1;
        } else {
          return 0;
        }
      });
    return (<>

        <h3 className='text-3xl text-center font-semibold mb-5 my-10'>My Requested Food</h3>
        { matchedUserRequest.length?<div className="overflow-x-auto w-3/4 text-center container my-10 mx-auto">
        <table className="table mx-auto border-2 border-violet-500">
    {/* head */}
                <thead className='bg-[#E6DFFC] text-black text-center text-base'>
                <tr>
                    <th>Meal Title</th>
                    <th>Number Of Likes</th>
                    <th>Reviews count</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                    sortedmatchedUserRequest.map(request=><RequestedMealDetails refetch={refetch} request={request} key={request._id}></RequestedMealDetails>)
                    }

                </tbody>

        </table>
 
    </div>:<>
            
            <h3 className='text-xl text-center text-black'>You did not Request for any meal</h3> </>}
           
            </>);
};

export default RequestedMeal;// Updated
