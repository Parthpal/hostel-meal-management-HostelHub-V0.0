import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../../../hook/useAdmin';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin]=useAdmin();
    const axiosSecure = useAxiosSecure();
    const { data:profile=[] } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    })
    const {data: mealDetails=[]}=useQuery({
        queryKey:['meal'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/mealCount/${user.email}`);
            console.log('datat count',res.data);
            return res.data;
        }
    })
    return (
        <div>
            <h3 className='text-2xl'>Hi,{user.displayName}</h3>
            <h3 className='text-2xl'>Here is Your DashBoard,</h3>

            <div className='flex justify-evenly border-2 border-blue-900 py-10 mt-4'>
             <div className='space-y-3 text-xl'>
             <h3>User Name:{profile.name}</h3>
             <h3>User email:{profile.email}</h3>
             <h3 className='flex '>Badge: <span className='uppercase px-1'>{profile.badge}</span>membership
            
             {/* {
                profile.badge==='bronze'?<img className='w-12 h-12 mx-2' src='/bronze.png' alt="" srcset="" />:<img className='w-12 h-12 mx-2' src='/gold.png' alt="" srcset="" />
             } */}
             </h3>
             <h3>
            {
                isAdmin?
                <h3>Total Meal Uploaded By Admin: {mealDetails.length}</h3>:
                 <h3></h3>
            }
            </h3>
            </div>   
            <div className='border-2 border-blue-900 p-1'>
                <img className='w-36 h-36' src={profile.photo} alt="" srcset="" />
                
                
            </div>

            </div>


        </div>
    );
};

export default UserProfile;// Updated
