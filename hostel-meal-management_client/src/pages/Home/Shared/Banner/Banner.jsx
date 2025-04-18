import React from 'react';

const Banner = () => {
    return (
        <div data-aos="fade-right" className="hero min-h-screen bg-[#E6EDFD]">
        <div  className="hero-content flex-col lg:flex-row-reverse">
            <div data-aos="zoom-in-up" className=''>
            <img  src="https://i.ibb.co/5hWg53S/20944167-removebg-preview.png" className="lg:max-w-lg max-h-full rounded-lg mx-auto" />
            </div>
            <div className=''>
                
            <h1 className="text-5xl font-bold">Simplifying Hostel Living <br/> <span className='text-[#1A0F91]'> With PH HostelHub</span></h1>
            <p className="py-6 text-gray-600 text-base">Experience the ease of managing hostels with DormEase - your all-in-one solution for efficient administration,meals and a comfortable stay. </p>
            <div className='flex '>
            <input type="text" placeholder="Meals here" className="input input-bordered input-primary w-full max-w-xs rounded-r-none" />
            <button className="btn btn-primary rounded-l-none bg-[#1A0F91]">Search</button>
            </div>
            
            </div>
        </div>
        </div>
    );
};

export default Banner;// Updated
