import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Header from "../Home/Shared/Header";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const PerMealDetails = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    const navigate=useNavigate();
    const { data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    })
    //checking user hold which package
    
    //console.log(subs_package);
    const {_id,image,meal_title,meal_rating,like_count,review_count,category,price,description,meal_ingredients,admin_name,admin_email,date}=useLoaderData();
    const liked_count={like_count:like_count}
    const reviewed_count={review_count:review_count};
    const reviews_filter=reviews.filter(review=>review.meal_id===_id);
    
    const handleLike=(e)=>{
        e.preventDefault();
        //data update
               fetch(`https://hostel-management-server-eight.vercel.app/mealLike/${_id}`,{
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
                       Swal.fire('Hurrah!You loved the meal');
                       console.log('Data updated');
                   }
               })
    }

    const handleRequestMeal=async(e)=>{
       
        e.preventDefault();
        const subs_package=users.find(p_user=>p_user.email===user.email);
        const item={
            meal_id:_id,
            meal_name:meal_title,
            user_name:user.displayName,
            user_email:user.email,
            status:'pending'
        }
        
       if(subs_package.badge =='bronze') {
        Swal.fire('purchase a subscription package')
        return;
       }
       else{
       const req_food=await axiosSecure.post('/requestFood',item)
       console.log(req_food.data)
       if(req_food.data.insertedId){
         Swal.fire('Request for Food is Pending');
        }
       }

    }
    
    const handleReviewSubmit=async(e)=>{
        e.preventDefault();
        const review=e.target.review.value;
        const review_details={
            meal_id:_id,
            email:user.email,
            review:review
        }
        const review_post=await axiosSecure.post('/review',review_details)
        console.log(review_post.data)
        if(review_post.data.insertedId){
                fetch(`https://hostel-management-server-eight.vercel.app/mealReview/${_id}`,{
                    method:"PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reviewed_count)
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    console.log(data);
                    if(data.modifiedCount>0){

                        Swal.fire('Successfully reviewed the meal');
                        console.log('Data updated');
                        refetch();
                    }
                })
         }
    }
   
   return (<>
        <Header/>
        <div>
            <div className="hero" style={{backgroundImage: `url(${image})`,height:'550px',backgroundPosition:'center top' ,backgroundRepeat:'no-repeat'}}>
            <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl uppercase font-bold text-yellow-200">{meal_title}</h1>
                    <h1 className="mb-5 text-2xl uppercase font-bold text-yellow-200">Meal Distributer: {admin_name}</h1>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
            <div className='mt-20 lg:mx-64 mx-4'>
            <div className="flex justify-center my-3 pb-3 border-b-2">
                  <p className=' text-gray-900 first-line:uppercase first-line:tracking-widest dark:first-letter:text-gray-100'> Rating: {meal_rating}/5</p>
                  <p className='ml-3 text-gray-900 first-line:uppercase first-line:tracking-widest   dark:first-letter:text-gray-100'> Post time:{date.slice(0, 10)}</p>
            </div>
                  <p className='mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left'> {description}</p>
                  <p className=' text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100'> Ingrediants: {meal_ingredients}</p>

            <div className="flex justify-center p-4">
             {
                user?<button onClick={handleLike} className="btn btn-error text-base mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Love Item
                </button>:
                <button className="btn btn-error text-base mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Love Item
                </button> 
             }   
            {
                user?
            <button onClick={handleRequestMeal}  className=' btn btn-success text-base text-center text-white' >Request For Meal</button>:
            <Link to='/login'  className=' btn btn-success text-base text-center text-white' >Request For Meal</Link>
            }           
            </div>

            <div className="">
                <h2 className="text-2xl mb-4">Write A Review.</h2>
                <form onSubmit={handleReviewSubmit} className="" action="">
                <textarea placeholder="review" name='review' className="block textarea textarea-bordered textarea-lg w-full " ></textarea>
                {user?
                <button type="submit" className="btn mt-3 px-10 float-right btn-primary text-white">Post Review</button>:
                <Link to='/login' className="btn mt-3 px-10 float-right btn-primary text-white">Post Review</Link>
                }
                
                </form>
            </div>
            <div>
            <h2 className="text-2xl mt-16 "> Reviews from students</h2>
                {
                    reviews_filter.map(review=><p className="mb-5 mt-2" key={review._id}>
                        {review.review}
                    </p> )
                    
                }
                
            </div>
            </div>
            

            
        </div>
   </>);
};

export default PerMealDetails;// Updated
