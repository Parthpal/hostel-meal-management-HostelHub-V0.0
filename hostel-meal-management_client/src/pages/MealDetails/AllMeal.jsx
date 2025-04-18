import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hook/useAxiosPublic';
import Header from '../Home/Shared/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { WVList } from "virtua";
import * as React from "react";



const AllMeal = () => {
    const [displayJobs,setDisplayJobs]=useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [jobs,setJobs]=useState([]);


    const axiosPublic=useAxiosPublic();
    const {data: mealDetails=[]}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/meal');
            //console.log('meal res',res.data);
            setJobs(res.data);
            setDisplayJobs(res.data);
            return res.data;
        }
    })

    
    function handleSearchClick(searchVal2) { 
        if (searchVal2 === " ") 
        { 
            setDisplayJobs(jobs); 
            return; 
        } 
        const filterBySearch = jobs.filter((item) => { 
            if (item.meal_title.toLowerCase() 
                .includes(searchVal2.toLowerCase())) 
                {
                     return item;
                }
            else{
                return setDisplayJobs(jobs); 
            }     
        }) 
        setDisplayJobs(filterBySearch); 
    } 

/****** filter */
const handleFilter=(filter)=>{
    if(filter=='all'){
        setDisplayJobs(jobs)
    }
    else if(filter=='breakfast'){
        const remoteFilter=jobs.filter(data=>data.category=='breakfast')
        setDisplayJobs(remoteFilter)
    }
    else if(filter=='lunch'){
        const remoteFilter=jobs.filter(data=>data.category=='lunch')
        setDisplayJobs(remoteFilter)
    }
    else if(filter=='dinner'){
        const remoteFilter=jobs.filter(data=>data.category=='dinner')
        setDisplayJobs(remoteFilter)
    }
    else if(filter=='underTen'){
        const remoteFilter=jobs.filter(data=>data.price<=10)
        setDisplayJobs(remoteFilter)
    }
    else if(filter=='aboveTen'){
        const remoteFilter=jobs.filter(data=>data.price>10)
        setDisplayJobs(remoteFilter)
    }


}
/********* */

    return (<>
   

    <Header/>
    <h3 className='text-4xl text-center font-semibold mb-5'>All Meals</h3>
    <div className='flex justify-between'>
      
        <div className="ml-8">
            <input className="input input-primary input-bordered w-full max-w-xs" placeholder="Find Food Here" onChange={e =>handleSearchClick(e.target.value)} type="text" />
            {/* <button onClick={handleSearchClick} className="btn">search</button> */}
        </div>
        {/* filter */}

        <div className='mr-8'>
        <details className="dropdown">
        <summary className="m-1 border-2 border-violet-800 btn">Price & Type Filter</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li onClick={()=>handleFilter('all')}><a>All</a></li>
            <li onClick={()=>handleFilter('breakfast')}><a>Breakfast</a></li>
            <li onClick={()=>handleFilter('lunch')}><a>Lunch</a></li>
            <li onClick={()=>handleFilter('dinner')}><a>Dinner</a></li>
            <li><a className='disable font-semibold'>Price range</a></li>
            <li onClick={()=>handleFilter('underTen')}><a>under $10</a></li>
            <li onClick={()=>handleFilter('aboveTen')}><a>Above $10</a></li>
        </ul>
        </details>
        </div>
        </div>
        <div>
        <WVList>
        {Array.from({ length: 1000 }).map((_, i) => (
        <div key={i}
          style={{
            background:"white",
            marginTop:'10px'
          }}>
            <div className='grid lg:grid-cols-3 grid-cols-1 my-10 '>
            {
                
                displayJobs.map(meal=><>
                
                                <div className="container card rounded-none lg:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
                             <figure><img className='w-full h-56' src={meal.image} alt="Shoes" /></figure>
                                <div className="p-5 text-left">
                                    <h2 className="card-title">Name: {meal.meal_title}</h2>
                                    <p>Meal Price: ${meal.price}</p>
                                    <p>Meal category: {meal.category}</p>
                                    <p>Meal Rating: {meal.meal_rating}/5</p>
                                    <p>Meal Ingredients: {meal.meal_ingredients.slice(0,20)}</p>
                                    <p>Meal Description: {meal.description.slice(0, 100)}</p>
                                    <Link to={`/meal/${meal._id}`} className="text-white btn bg-[#1A0F91] font-semibold w-full my-5">Details</Link>
                            </div>
                          </div>
                          </>)
            }
           </div>
        </div>
        ))}
    </WVList>
    </div>
        </>);
};

export default AllMeal;// Updated
