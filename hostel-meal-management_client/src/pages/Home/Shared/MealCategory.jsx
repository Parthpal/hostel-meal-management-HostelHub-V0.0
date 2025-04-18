import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";

const MealCategory = () => {
    const axiosPublic=useAxiosPublic();
    const {data: mealDetails=[]}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/meal');
            console.log(res.data);
            return res.data;
        }
    })

    const matchedData_breakfast=mealDetails.filter(meal=>meal.category==='breakfast');
    const matchedData_lunch=mealDetails.filter(meal=>meal.category==='lunch');
    const matchedData_dinner=mealDetails.filter(meal=>meal.category==='dinner');

    return (<>
        <div>
        <div className="mb-6">
            <h3 className='text-5xl font-bold text-center text-[#1A0F91]  mx-auto'>Variety Meal Options</h3>
            <p className='text-base text-gray-500 text-center mt-4  mx-auto'>Embark on a gastronomic adventure with our delectable dishes, each crafted with fresh, high-quality ingredients. </p>
        </div>
            <Tabs className='text-center '>
                <TabList className='border-b-2 text-[#1A0F91] font-bold border-[#1A0F91]'>
                    <Tab>All</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

    <TabPanel className=''>
        <div data-aos='fade-out' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-6'>
            {
                mealDetails.map(meal=><>
                <div className="card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                        <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                            <div className="p-5 text-left">
                                <h2 className="card-title">Name: {meal.meal_title}</h2>
                                <p>Meal Price: ${meal.price}</p>
                                <p>Meal Rating: {meal.meal_rating}/5</p>
                                <Link to={`/meal/${meal._id}`} className="text-white btn bg-[#1A0F91] font-semibold w-full my-5">Details</Link>
                          </div>
                          </div>
                </>)
               
            }
            </div> 
        </TabPanel>
    <TabPanel className=''>
        <div data-aos='fade-out' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-6'>
            {
                matchedData_breakfast.map(meal=><>
                <div className="card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                        <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                            <div className="p-5 text-left">
                                <h2 className="card-title">Name: {meal.meal_title}</h2>
                                <p>Meal Price: ${meal.price}</p>
                                <p>Meal Rating: {meal.meal_rating}/5</p>
                                <Link to={`/meal/${meal._id}`} className="text-white btn bg-[#1A0F91] font-semibold w-full my-5">Details</Link>
                          </div>
                          </div>
                </>)
               
            }
            </div> 
        </TabPanel>
    <TabPanel className=''>
        <div data-aos='fade-out' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-6 '>
            {
                matchedData_lunch.map(meal=><>
                <div className="card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                        <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                            <div className="p-5 text-left">
                                <h2 className="card-title">Name: {meal.meal_title}</h2>
                                <p>Meal Price: ${meal.price}</p>
                                <p>Meal Rating: {meal.meal_rating}/5</p>
                                <Link to={`/meal/${meal._id}`} className="text-white btn bg-[#1A0F91] font-semibold w-full my-5">Details</Link>
                          </div>
                          </div>
                </>)
               
            }
            </div> 
        </TabPanel>
    <TabPanel className=''>
        <div data-aos='fade-out' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-6'>
            {
                matchedData_dinner.map(meal=><>
                <div className="card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                        <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                            <div className="p-5 text-left">
                                <h2 className="card-title">Name: {meal.meal_title}</h2>
                                <p>Meal Price: ${meal.price}</p>
                                <p>Meal Rating: {meal.meal_rating}/5</p>
                                <Link to={`/meal/${meal._id}`} className="text-white btn bg-[#1A0F91] font-semibold w-full my-5">Details</Link>
                          </div>
                          </div>
                </>)
               
            }
            </div> 
        </TabPanel>

  </Tabs>
        </div>
        <div className="my-10">
        <Link to='/allMeal' className='btn btn-lg mx-36 md:mx-96 flex justify-center align-middle text-xl bg-[#1A0F91] text-white'>See All</Link>
        </div>
        </>);
};

export default MealCategory;// Updated
