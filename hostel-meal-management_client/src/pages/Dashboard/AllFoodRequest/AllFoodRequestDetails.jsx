import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const AllFoodRequestDetails = ({request,refetch}) => {
    const axiosSecure=useAxiosSecure();
    const {_id,meal_id,meal_name,user_name,user_email,status}=request;

    const handleMakeDeliver = (_id) =>{
        axiosSecure.patch(`/foodDelivered/${_id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Food is an Delivered Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    return (<>
        
        <tr className="hover text-center">
             <td>
             {meal_name}
            </td>

            <td>
                {user_name}
            </td>
            <td>
            {user_email}
            </td>
            
             <td>
             {status}
            </td>
             <td>
             <div className='space-x-2'>
             <Link onClick={()=>handleMakeDeliver(_id)} className="btn btn-outline btn-secondary">Serve</Link>
             </div>
            </td>
         </tr>

        </>);
};

export default AllFoodRequestDetails;// Updated
