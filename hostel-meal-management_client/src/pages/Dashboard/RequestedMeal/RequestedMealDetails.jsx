import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const RequestedMealDetails = ({request,refetch}) => {
    const {_id,meal_id,meal_name,user_name,status}=request;
    const axiosSecure=useAxiosSecure();
    const {data: mealDetails=[]}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/meal');
            console.log(res.data);
            return res.data;
        }
    })
    const meal_filter=mealDetails.filter(meal=>meal._id== meal_id);
    const handleDelete=(_id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel this from Requested Food?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://hostel-management-server-eight.vercel.app/requestedFoodDel/${_id}`,{
                        method:'DELETE'
                    })
                    .then(res=> res.json())
                    .then(data=>{
                        console.log(data);
                        if(data.deletedCount > 0){
                           Swal.fire(
                            'Deleted!',
                            'Requested Food Cancelled',
                            'success'
                           )
                           refetch();
                            //  console.log('remainin',remaining);
                        }
                    }) 
            }
        })
       
    }

    return (<>
        
        <tr className="hover text-center">
             <td>
             {meal_name}
            </td>
             
            {meal_filter.map(filter=><td>{filter.like_count}</td>)}
            
             <td>
             {meal_filter.map(filter=><td>{filter.review_count}</td>)}
            </td>
             <td>
             {status}
            </td>
             <td>
             <div className='space-x-2'>
             <Link onClick={()=>handleDelete(_id)} className="btn btn-outline btn-secondary">Cancel</Link>
             </div>
            </td>
         </tr>

        </>
    );
};

export default RequestedMealDetails;// Updated
