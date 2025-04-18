import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllMealsDetails = ({request,refetch}) => {
    const {_id,image,meal_title,meal_rating,like_count,review_count,category,price,description,meal_ingredients,admin_name,admin_email,date}=request;
    //deltet
    const handleDelete=(_id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete meal from menu?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://hostel-management-server-eight.vercel.app/menuItemDel/${_id}`,{
                        method:'DELETE'
                    })
                    .then(res=> res.json())
                    .then(data=>{
                        console.log(data);
                        if(data.deletedCount > 0){
                           Swal.fire(
                            'Deleted!',
                            'Meal Deleted From Menu',
                            'success'
                           )
                           refetch();
                            //  console.log('remainin',remaining);
                        }
                    }) 
            }
        })
       
    }
   
   
   
   return ( <>      
         <tr className="hover text-center">
    <td>
    {meal_title}
   </td>
    <td>
        {like_count}
    </td>
    <td>
    {review_count}
   </td>
    <td>
    {admin_name}
   </td>
    <td>
    {admin_email}
   </td>
    <td>
    <div className='space-x-2 space-y-2'>
    <Link  to={`/dashboard/updateItem/${_id}`}  className="btn btn-outline btn-xs btn-primary">Edit</Link>
    <Link onClick={()=>handleDelete(_id)} className="btn btn-outline btn-xs btn-secondary">Delete</Link>
    <Link to={`/meal/${_id}`} className="btn btn-outline btn-xs">View</Link>  
    </div>
   </td>
</tr>

</>);
};

export default AllMealsDetails;// Updated
