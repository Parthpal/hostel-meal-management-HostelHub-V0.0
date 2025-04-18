import Swal from 'sweetalert2';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { updateProfile } from 'firebase/auth';
import Header from '../Home/Shared/Header';
import Footer from '../Footer/Footer';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import useAxiosPublic from '../../hook/useAxiosPublic';
import { GoogleAuthProvider } from 'firebase/auth';

const Registration = () => {
     const {createUser,updateUserProfile,googleSignIn}=useContext(AuthContext);
     const navigate=useNavigate();
     const axiosPublic=useAxiosPublic();
     const { register, handleSubmit,reset } = useForm();
     const location=useLocation();
     const Navigate=useNavigate();

     const onSubmit=(data)=>{
        console.log(data.email);
        if(data.password.length<6){
            return toast('Password should be 6 Character');
        }
        else if(!/[A-Z]/.test(data.password)){
            return toast('Kindly use at least one capital letter');
        }
        else if(!/[^\w\s]/.test(data.password)){
            return toast('Kindly use at least one special character');
        }
        else {
            createUser(data.email,data.password)
            .then((userCredential) => {
                // Signed up 
                const res_user = userCredential.user;
                updateUserProfile(data.name,data.photo)
                    .then(() => {
                        axiosPublic.post('/users',{
                            email:data.email,
                            name:data.name,
                            photo:data.photo,
                            badge:"bronze"
                        })    
                        .then(res=>{
                            if(res.data.insertedId){
                                console.log('user added to database');
                                Swal.fire('Registration Successful');
                                navigate('/');
                            }
                        })
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });

              })
              .catch((error) => {
                toast('Registration failed,Try Again');
                // ...
              });

        }
        reset();
     }
     const handleGoogleLogin=()=>{
        googleSignIn()
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google Api
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            axiosPublic.post('/users',{
                email:user.email,
                name:user.displayName,
                photo:user.photoURL,
                badge:"bronze"
            })    
            .then(res=>{
                    Swal.fire('Login Successful');
                    Navigate('/');
            })

          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            toast('Invalid Email Or Password.Please Try Again');
            // ...
          });
    }
    // const handleRegister=(e)=>{
    //     e.preventDefault();
    //     const form=new FormData(e.currentTarget);
    //     const nameVal=form.get('name');
    //     const photoVal=form.get('photo');
    //     const emailVal=form.get('email');
    //     const passwordVal=form.get('password');

    //     if(passwordVal.length<6){
    //         return toast('Password should be 6 Character');
    //     }
    //     else if(!/[A-Z]/.test(passwordVal)){
    //         return toast('Kindly use at least one capital letter');
    //     }
    //     else if(!/[^\w\s]/.test(passwordVal)){
    //         return toast('Kindly use at least one special character');
    //     }
    //     else
    //     {
    //         createUser(emailVal,passwordVal)
    //         .then((userCredential) => {
    //             // Signed up 
    //             const res_user = userCredential.user;
    //             updateProfile(res_user, {
    //                 displayName: nameVal, photoURL: photoVal
    //               }).then(() => {
    //                 Swal.fire('Registration Successful');
    //                 // ...
    //               }).catch((error) => {
    //                 // An error occurred
    //                 // ...
    //               });

    //           })
    //           .catch((error) => {
    //             toast('Registration failed,Try Again');
    //             // ...
    //           });

    //     }
    //     e.target.reset();
    // }
     
    return (<>
    <Header/>
    <div className='flex flex-col lg:flex-row my-10'>
            <div data-aos='zoom-out' className="flex-1  ">
                <img className='lg:max-w-lg lg:ml-36 mt-20' src="https://i.ibb.co/HgqQjGx/register.png" alt="login    " srcset="" />
             </div>
            <div className='flex-1 mt-16'>
            <div data-aos='zoom-out' className="md:w-[400px] w-[350px] bg-base-200 rounded-lg border-[#7E57C2] border-2 lg:mx-0 mx-auto">
            <h3 className='text-3xl text-center mt-4 font-bold text-[#7E57C2]'>Register Here</h3>
                <div className=" ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                     <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#7E57C2]">Name</span>
                        </label>
                        <input {...register("name")} type="text" name="name" placeholder="name" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#7E57C2]">Photo</span>
                        </label>
                        <input {...register("photo")} type="text" name="photo" placeholder="photo" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#7E57C2]">Email</span>
                        </label>
                        <input {...register("email")} type="email" name="email" placeholder="email" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#7E57C2]">Password</span>
                        </label>
                        <input {...register("password")} type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label mt-3">
                           <p>Already a Member! Please<Link className='label-text-alt link link-hover text-base text-yellow-600' to="/login"> Login</Link></p>
                        </label>
                    
                     </div>
                        
                        <div className="form-control mt-4">
                        <button type='submit' className="btn bg-[#7E57C2] text-white">Register</button>
                     </div>

                    </form>
                    <div className='text-center'>
                         <button onClick={handleGoogleLogin} className="btn btn-success w-5/6 mb-5 text-white">Sign With Google</button>            
                    </div>
                    </div>
            </div>
            </div>
            <ToastContainer/>
        </div>
        <Footer/>
        </> );
};

export default Registration;// Updated
