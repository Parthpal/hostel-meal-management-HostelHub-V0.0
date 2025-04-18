import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Header from '../../Home/Shared/Header';
import AllFoodRequestDetails from './AllFoodRequestDetails';

const AllFoodRequest = () => {
    const axiosSecure=useAxiosSecure();
    const [display,setDisplay]=useState([]);
    const [allData,setAllData]=useState([]);
    
    const {data: requestFood=[],refetch}=useQuery({
        queryKey:['requestFood'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/requestFood');
            console.log(res.data);
            setDisplay(res.data);
            setAllData(res.data);
            return res.data;
        }
    })

    const handleSearch=async(e)=>{
        e.preventDefault();
        const custInput=e.target.name.value;
        if(custInput == " "){
            setDisplay(allData);
        }
        const res_user=await axiosSecure.get(`/userInputFood?input=${custInput}`);
        setDisplay(res_user.data);
        console.log(res_user.data);
    }

    return (<>

        <h3 className='text-3xl text-center font-semibold mb-5 my-10'>Food Request By Students</h3>
        <div className='float-right mb-4'>
            <form className="flex " onSubmit={handleSearch} action="">  
            <div>
            <input type="text" name="name" placeholder="Name Or Email" className="input block input-bordered input-primary w-full max-w-xs rounded-r-none" />
            <span className="label-text-alt">Keep box empty then search to see all Data</span>
            </div>
            <div>
           <button type="submit" className="btn btn-primary rounded-l-none bg-[#1A0F91]">Search</button>
           </div>
            </form> 
            </div>
        
        
        { requestFood.length?<div className="overflow-x-auto w-3/4 text-center container my-10 mx-auto">
        <table className="table mx-auto border-2 border-violet-500">
    {/* head */}
                <thead className='bg-[#E6DFFC] text-black text-center text-base'>
                <tr>
                    <th>Meal Title</th>
                    <th>email</th>
                    <th>name</th>
                    <th>status</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                    display.map(request=><AllFoodRequestDetails refetch={refetch} key={request._id} request={request}></AllFoodRequestDetails>)
                    }

                </tbody>

        </table>
 
    </div>:<>
            
            <h3 className='text-xl text-center text-black'>No food Request yet</h3> </>}
           
            </> );
};

export default AllFoodRequest;// Updated
