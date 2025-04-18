import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const MembsershipSection = () => {
    const axiosPublic=useAxiosPublic();

    const {data: membershipDetails=[]}=useQuery({
        queryKey:['membership'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/membershipPackage');
            console.log(res.data);
            return res.data;
        }
    })
    
    return (<>
        <div>
            <h3 className='text-5xl font-bold text-center text-[#1A0F91]  mx-auto'>Premium Membership</h3>
            <p className='text-base text-gray-500 text-center mt-4  mx-auto'>As a Premium Member, you'll enjoy priority access to an extensive menu <br/> featuring gourmet creations, personalized meal consultations, and concierge-level service. </p>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:w-full grid-cols-1 my-10 '>
        {
            membershipDetails.map(member=> 
             <div key={member._id}  data-aos='fade-out' className="card rounded-none md:w-96 sm:w-full bg-base-100 shadow-xl mx-auto my-2">
            <figure><img className='w-96 h-64' src={member.image} alt="Shoes" /></figure>
            <div className="p-5 text-left">
                <h2 className="card-title">Membership: {member.name} </h2>
                <h2 className="card-title">Price:${member.price} </h2>
                <p className='my-2'>{member.description.slice(0, 300)}</p>
                <Link to={`/checkout/${member.name}`} className='btn w-full text-xl bg-[#1A0F91] text-white'>Upgrade Now</Link>
          </div>
      </div>
                )
        }
        </div>
                      
       
       

        </>);
};

export default MembsershipSection;// Updated
