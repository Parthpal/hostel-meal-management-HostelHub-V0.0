import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Header from "../../Home/Shared/Header";
import AllMealsDetails from "./AllMealsDetails";

const AllMeals = () => {
    const axiosSecure=useAxiosSecure();
    const {data: mealDetails=[],refetch}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/meal');
            console.log(res.data);
            return res.data;
        }
    })
    return (<>

        <h3 className='text-3xl text-center font-semibold mb-5 my-10'>All Meals</h3>
        { mealDetails.length?<div className="overflow-x-auto text-center container my-10 mx-auto">
        <table className="table-lg mx-auto border-2 border-violet-500">
    {/* head */}
                <thead className='bg-[#E6DFFC] text-black text-center text-base'>
                <tr>
                    <th>Meal Title</th>
                    <th>Number Of Likes</th>
                    <th>Reviews count</th>
                    <th>Distributer Name</th>
                    <th>Distributer Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                    mealDetails.map(request=><AllMealsDetails refetch={refetch} request={request} key={request._id}></AllMealsDetails>)
                    }

                </tbody>

        </table>
 
    </div>:<>
            
            <h3 className='text-xl text-center text-black'>There is no meal</h3> </>}
           
            </>);
};

export default AllMeals;// Updated
