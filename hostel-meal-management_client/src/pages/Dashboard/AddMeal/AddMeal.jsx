import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider/AuthProvider";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const AddMeal = () => {
    const {user}=useContext(AuthContext);
    const [startDate_post, setStartDate_post] = useState(new Date());
    const { register, handleSubmit,reset } = useForm();
    const axiosSecure=useAxiosSecure();
   // let date=startDate_post;
    const addMeal=async (data)=>{
        const meal_title=data.meal_title;
        const  meal_rating= data.meal_rating;
        const  category= data.category;
        const  price= data.price;
        const  description= data.description;
        const  meal_ingredients= data.meal_ingredients;
        const  like= data.like;
        const like_count=parseInt(like);
        const  review= data.review;
        const review_count=parseInt(review);
        const image=data.photo;
        const  admin_name= data.admin_name;
        const  admin_email= data.admin_email;

        const add_meal={
            meal_title,
            meal_rating,
            category,
            price,
            description,
            meal_ingredients,
            like_count,
            review_count,
            admin_name,
            admin_email,
            image,
            date:startDate_post
        }

       console.log('add meal',add_meal);

       const meal_res=await axiosSecure.post('/meal',add_meal);
       console.log(meal_res.data);
        if(meal_res.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Meal is added to the menu.',
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    const upComingMeal=async(data)=>{
        // alert('clicked on upcoming meal',data.meal_title)
        const meal_title=data.meal_title;
        const  meal_rating= data.meal_rating;
        const  category= data.category;
        const  price= data.price;
        const  description= data.description;
        const  meal_ingredients= data.meal_ingredients;
        const  like= data.like;
        const like_count=parseInt(like);
        const  review= data.review;
        const review_count=parseInt(review);
        const image=data.photo;
        const  admin_name= data.admin_name;
        const  admin_email= data.admin_email;

        const upcoming_meal={
            meal_title,
            meal_rating,
            category,
            price,
            description,
            meal_ingredients,
            like_count,
            review_count,
            image,
            admin_name,
            admin_email,
            date:startDate_post
        }
       console.log('upcoming meal',upcoming_meal);
       const meal_res=await axiosSecure.post('/upcomingMeal',upcoming_meal);
       console.log(meal_res.data);
        if(meal_res.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Upcoming Meal will added to menu soon',
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    return (
        <div>
            <h3 className='text-5xl font-bold text-[#1A0F91] text-center my-5'>Add Meal Here</h3>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <form  className="card-body ">
                        <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>

                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Title</span>
                            </label>
                            <input type="text" placeholder="Meal title" name='meal_title' {...register('meal_title')} className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Rating</span>
                            </label>
                            <input type="text" name='meal_rating' {...register('meal_rating')} placeholder="Meal Rating" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Type</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select Meal category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                            </div>

                            
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name='price' {...register('price')}  placeholder="price" className="input input-bordered" required />
                            </div>
                            
                            
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Description</span>
                            </label>
                            <input type="text" name='desc' {...register('description')} placeholder="Description" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Posting Date</span>
                            </label>
                            {/* <input type="date" name='job_post_date' placeholder="Posting date" className="input input-bordered" required /> */}
                            <DatePicker  className="input input-bordered" selected={startDate_post} onChange={(date) => setStartDate_post(date)} />
                            </div>

                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Ingredients</span>
                            </label>
                        
                            <input type="text" {...register('meal_ingredients')} placeholder="ingredients" name='meal_ingredients' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Like</span>
                            </label>
                            <input type="text" {...register('like')} defaultValue='0' name='like' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reviews</span>
                            </label>
                            <input type="text" defaultValue='0' {...register('review')} name='review' className="input input-bordered" required />
                            </div>
                            
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meal Image</span>
                            </label>
                            <input type="text" name='photo' {...register('photo')} placeholder="photoUrl" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Distributer Name</span>
                            </label>
                            <input type="text" name='u_name' {...register('admin_name')} defaultValue={user.displayName} className="input input-bordered" required />
                         </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Distributer email</span>
                            </label>
                            <input type="text" name='u_email' {...register('admin_email')} defaultValue={user.email} className="input input-bordered" required />
                        </div>
                        </div>
                        <div className="inline mx-auto form-control mt-6">
                            <button onClick={handleSubmit(addMeal)} className="mx-4 px-12 btn border-none btn-primary bg-[#1A0F91]">Add Meal</button>
                            <button onClick={handleSubmit(upComingMeal)} className="mx-4 btn border-none btn-primary bg-[#1A0F91]">Add Upcoming Meals</button>
                        </div>
                    
                    </form>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default AddMeal;// Updated
