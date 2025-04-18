import { useContext } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';
import './Header.css';
import { FaBell } from "react-icons/fa";
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';

const Header = () => {
     const {user,logOut}=useContext(AuthContext);
    const handleLogout=()=>{
      logOut()
      .then(() => {
        // Sign-out successful.
      }).catch(() => {
        // An error mssge
      });
    }
  
    const links=<>
    <li><Link to="/login">Join US</Link></li>
    </>
    return (<>
        <div className="navbar dark:bg-black dark:text-white bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/meals">Meals</Link></li>
                <li><Link to="/upcomingMeals">UpComing Meals <FaBell/></Link></li>      
                {user?" ":links}
                </ul>
                </div>
                <img className='w-12 h-12 mr-2' src="https://i.ibb.co/DfmzGZW/hostel.png" alt="" srcset="" />
                <a className="normal-case text-xl font-semibold hidden md:block text-[#1A0F91]">PH HostelHub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/allMeal">Meals</Link></li>
                <li><Link to="/upcomingMeal">UpComing Meals<FaBell/></Link></li>      
                {user?" ":links}
                
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
              { user ?
              <ul className="menu menu-horizontal px-1 lg:mr-5"> 
                <li tabIndex={0}>
                  <details>
                    <summary>
                    <img className="w-10 h-10 rounded-full border-2 border-white hidden md:block mx-2"  src={user.photoURL} />
                    </summary>
                    <ul className="z-10">
                    <li className='text-center py-1'> {user.displayName}</li>
                      <li><Link to="/dashboard/UserProfile">Dashboard</Link></li>
                      <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </details>
                </li>
              </ul>:
              " "
              }
            </div>

        </div>
        </>);
};

export default Header;// Updated
