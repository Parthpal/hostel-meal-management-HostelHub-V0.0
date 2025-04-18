import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const UpcomingMealsDetails = ({request,refetch}) => {
    const {_id,image,meal_title,meal_rating,like_count,review_count,category,price,description,meal_ingredients,admin_name,admin_email,date}=request;
    const axiosSecure=useAxiosSecure();
    const {data: upcomingMealDetails=[]}=useQuery({
        queryKey:['upcomingMeal'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/upcomingMeal');
            console.log(res.data);
            return res.data;
        }
    })
    const addMeal=async (_id)=>{
        // e.preventDefault();
        const mathced_upcmd=upcomingMealDetails.find(upc=>upc._id==_id);
        // console.log(mathced_upcmd.like_count)
        if(mathced_upcmd.like_count>=10){
                   const add_meal={
            meal_title: meal_title,
            meal_rating:meal_rating,
            category:category,
            price:price,
            description:description,
            meal_ingredients:meal_ingredients,
            like_count:like_count,
            review_count:review_count,
            admin_name:admin_name,
            admin_email:admin_email,
            image:image,
            date:date
        }

       console.log('add meal publish',add_meal);

        const meal_res= await axiosSecure.post('/meal',add_meal);
       console.log(meal_res);
        if(meal_res.data.insertedId){
            fetch(`https://hostel-management-server-eight.vercel.app/UpcomingMenuItemDel/${_id}`,{
                method:'DELETE'
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount > 0){
                    Swal.fire({
                        position: "top-end",
                       icon: "success",
                       title: 'Meal is added to the menu.',
                        showConfirmButton: false,
                        timer: 1500
                      });
                   refetch();
                    //  console.log('remainin',remaining);
                }
            }) 
         }
        }
        else{
            Swal.fire('you can not add this to main meal')
        }
 
     }
    

   return (<>      
        <tr className="hover text-center">
   <td>
   {meal_title}
  </td>
   <td>
       {like_count}
   </td>
   <td>
   <div className='space-x-2 space-y-2'>
   <button onClick={()=>addMeal(_id)}  className="btn btn-outline btn-xs btn-primary">Publish</button> 
   </div>
  </td>
</tr>

</> );
};

export default UpcomingMealsDetails;// Updated
