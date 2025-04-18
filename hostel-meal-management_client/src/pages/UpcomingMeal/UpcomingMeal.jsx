import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";
import Header from "../Home/Shared/Header";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const UpcomingMeal = () => {
    const axiosPublic=useAxiosPublic();
    const {user}=useContext(AuthContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const {data: UpcomingMealDetails=[]}=useQuery({
        queryKey:['upcomingMeal'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/upcomingMeal');
            console.log('upcoming meal',res.data);
            return res.data;
        }
    })
    const {data: UpcomingMealLikeSaveDetails=[]}=useQuery({
        queryKey:['upcomingMealLike'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/upcomingMealSave');
            console.log('upcoming meal like save',res.data);
            return res.data;
        }
    })
    const liked_count={like_count:UpcomingMealDetails.like_count}
    const handleLikeButton=async(id)=>{
        setDisabledButtons([...disabledButtons, id]);
        const upcoming_meal_like_details={
            meal_id:id,
            email:user.email,
            Like:1
        }
        const meal_like_save=await axiosPublic.post('/upcomingMealSave',upcoming_meal_like_details)
        console.log(meal_like_save.data)
        if(meal_like_save.data.insertedId){
                fetch(`https://hostel-management-server-eight.vercel.app/upcomingMealLike/${id}`,{
                    method:"PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(liked_count)
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    console.log(data);
                    if(data.modifiedCount>0){

                        Swal.fire('Hurrah! you liked the meal');
                        console.log('Data updated');
                    }
                })
         }
        
    //     console.log('meal clicked',id);
    //     const matchedUser=UpcomingMealLikeSaveDetails.find(upc=>upc.email==user.email || upc.meal_id ==id || upc.Like=='1');
    //    // console.log(matchedUser);
    //     //console.log('coming from upcoming save',matchedUser.email,matchedUser.meal_id,matchedUser.Like)
    //   //console.log('we are matching',user.email,id,1);
    //     if(user.email==matchedUser.email && matchedUser.meal_id==id && matchedUser.Like =='1'){
    //         Swal.fire('You already liked the meal');
    //         return;
    //     }
    //     else
    //     {

    //     }
    }
    

    return (<>
        <Header/>
            <h3 className='text-4xl text-center font-semibold mb-5'>Upcoming Meals</h3>
            <div data-aos='zoom-out' className='grid lg:grid-cols-3 grid-cols-1 my-10 '>
                {
                    UpcomingMealDetails.map(meal=><>
                                    <div className="card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                                 <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                                    <div className="p-5 text-left">
                                        <h2 className="card-title">Name: {meal.meal_title}</h2>
                                        <p>Meal Price: ${meal.price}</p>
                                        <p>Meal category: {meal.category}</p>
                                        <p>Meal Rating: {meal.meal_rating}/5</p>
                                        <p>Meal Ingredients: {meal.meal_ingredients.slice(0,20)}</p>
                                        <p>Meal Description: {meal.description.slice(0, 100)}</p>
                                        <Link disabled={disabledButtons.includes(meal._id)} onClick={()=>handleLikeButton(meal._id)} className="text-white btn btn-error font-semibold w-full my-5">Like</Link>
                                </div>
                              </div>
                    </>)
                }
            </div>
            </>);
};

export default UpcomingMeal;// Updated
