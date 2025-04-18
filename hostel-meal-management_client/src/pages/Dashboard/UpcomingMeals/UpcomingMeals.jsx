import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Header from '../../Home/Shared/Header';
import UpcomingMealsDetails from './UpcomingMealsDetails';

const UpcomingMeals = () => {
    const axiosSecure=useAxiosSecure();
    const {data: upcomingMealDetails=[],refetch}=useQuery({
        queryKey:['upcomingMeal'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/upcomingMeal');
            console.log(res.data);
            return res.data;
        }
    })
   const upcomingMealDetails_sort=upcomingMealDetails.sort((a, b) => b.like_count - a.like_count);
    return (<>

        <h3 className='text-3xl text-center font-semibold mb-5 my-10'>Upcoming Meals</h3>
        { upcomingMealDetails.length?<div className="overflow-x-auto text-center container my-10 mx-auto">
        <table className="table-lg mx-auto border-2 border-violet-500">
    {/* head */}
                <thead className='bg-[#E6DFFC] text-black text-center text-base'>
                <tr>
                    <th>Meal Title</th>
                    <th>Number Of Likes</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                    upcomingMealDetails_sort.map(request=><UpcomingMealsDetails refetch={refetch} request={request} key={request._id}></UpcomingMealsDetails>)
                    }

                </tbody>

        </table>
 
    </div>:<>
            
            <h3 className='text-xl text-center text-black'>There is no upcoming meal</h3> </>}
           
            </> );
};

export default UpcomingMeals;// Updated
