import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ReviewMealDetails = ({reviews,refetch}) => {
    const {_id,meal_id,email,review}=reviews;
    const axiosSecure=useAxiosSecure();
    const {data: mealDetails=[]}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/meal');
            console.log(res.data);
            return res.data;
        }
    })

    const {data: reviewFood=[]}=useQuery({
        queryKey:['reviewFood'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/review');
            console.log(res.data);
            return res.data;
        }
    })

    const handleDelete=(_id)=>{
        const meal_find=reviewFood.find(review=>review._id== _id);
        //console.log('mealid from meal review', meal_find.meal_id);
        const meal_find_meal=mealDetails.find(meal=>meal._id== meal_find.meal_id);
       // console.log('meal review count meal',meal_find_meal.review_count);
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete review on Food?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://hostel-management-server-eight.vercel.app/reviewFoodDel/${_id}`,{
                        method:'DELETE'
                    })
                    .then(res=> res.json())
                    .then(data=>{
                        console.log(data);
                        if(data.deletedCount > 0){
                            fetch(`https://hostel-management-server-eight.vercel.app/reviewsDecUpdate/${meal_find_meal._id}`,{
                                method:"PUT",
                                headers: {
                                    'content-type': 'application/json'
                                  },
                                body: JSON.stringify({review_count:meal_find_meal.review_count})
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log('review count',data);
                                if(data.modifiedCount>0){
                                    Swal.fire(
                                        'Deleted!',
                                        'Review on food,cancelled',
                                        'success'
                                       )
                                    refetch();
                                }
                            })
                        
                           refetch();
                            //  console.log('remainin',remaining);
                        }
                    }) 
            }
        })
       
    }



    const meal_filter=mealDetails.filter(meal=>meal._id== meal_id);
    return (<>
        
        <tr className="hover text-center">
             <td>
             {meal_filter.map(filter=><td>{filter.meal_title}</td>)}
            </td>
             
            {meal_filter.map(filter=><td>{filter.like_count}</td>)}
            
             <td>
             {meal_filter.map(filter=><td>{filter.review_count}</td>)}
            </td>
             <td>
             <div className='space-x-2'>
             <Link  to={`/UpdateReview/${_id}`}  className="btn btn-outline btn-primary">Edit</Link>
             <Link onClick={()=>handleDelete(_id)} className="btn btn-outline btn-secondary">Delete</Link>
             <Link to={`/meal/${meal_id}`} className="btn btn-outline">View</Link>
             </div>
            </td>
         </tr>

        </> );
};

export default ReviewMealDetails;// Updated
