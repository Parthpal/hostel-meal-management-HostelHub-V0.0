import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
//import useCart from "../hooks/useCart";
//import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    //const [cart] = useCart();
   const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar */}

            <div className="w-64 min-h-screen bg-[#1A0F91] text-white ">
                <ul className="menu p-4 text-base">
            <div className="flex align-middle py-4">
            <img className='w-12 h-12 mr-2' src="https://i.ibb.co/DfmzGZW/hostel.png" alt="" srcset="" />
            <a className="normal-case text-xl font-semibold hidden md:block text-white">PH HostelHub</a>
            </div>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/UserProfile">
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUser">
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addMeal">
                                    Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allMeals">
                                    All meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews">
                                    All reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allFoodRequest">
                                    Serve Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcomingMeals">
                                    Upcoming Meals</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/UserProfile">
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedMeal">
                                        Requested Meals
                                        </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reviewMeal">
                                        My Reviews</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider divider-info"></div>
                    <li>
                        <NavLink to="/">
                            
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;// Updated
