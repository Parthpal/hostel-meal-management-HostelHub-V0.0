import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [display,setDisplay]=useState([]);
    const [allData,setAllData]=useState([]);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            setDisplay(res.data);
            setAllData(res.data);
            return res.data;
            
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleSearch=async(e)=>{
        e.preventDefault();
        const custInput=e.target.name.value;
        if(custInput == " "){
            setDisplay(allData);
        }
        const res_user=await axiosSecure.get(`/userInput?input=${custInput}`);
        setDisplay(res_user.data);
        console.log(res_user.data);
    }

    return (<>
        <div>
            <div className='float-right'>
            <form className="flex " onSubmit={handleSearch} action="">  
            <div>
            <input type="text" name="name" placeholder="Name Or Email" className="input block input-bordered input-primary w-full max-w-xs rounded-r-none" />
            <span className="label-text-alt">Keep box empty then search to see all Data</span>
            </div>
            <div>
           <button type="submit" className="btn btn-primary rounded-l-none bg-[#1A0F91]">Search</button>
           </div>
            </form> 
            </div>
            
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Students</h2>
                <h2 className="text-3xl">Total Students: {users.length}</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            display.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    { user.role === 'admin' ? <span className="btn btn-xs text-white bg-[#E54D48]">Admin</span> : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-xs text-white bg-[#1A0F91]">
                                        Student
                                    </button>}
                                </td>
                                <td>
                                    {user.badge}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
        </>);
};

export default AllUsers;// Updated
