import React from 'react';
import { createBrowserRouter } from 'react-router-dom';


import ErrorPage from '../../ErrorPage';
import Root from '../Layouts/Root';
import Home from '../pages/Home/Home';
import Registration from '../pages/Registration/Registration';
import Login from '../pages/Login/Login';
import Dashboard from '../Layouts/Dashboard';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import UserProfile from '../pages/Dashboard/UserProfile/UserProfile';
import Checkout from '../pages/Chekout/Checkout';
import Payment from '../pages/Payment/Payment';
import AddMeal from '../pages/Dashboard/AddMeal/AddMeal';
import AllMeal from '../pages/MealDetails/AllMeal';
import UpcomingMeal from '../pages/UpcomingMeal/UpcomingMeal';
import PerMealDetails from '../pages/MealDetails/PerMealDetails';
import RequestedMeal from '../pages/Dashboard/RequestedMeal/RequestedMeal';
import ReviewMeal from '../pages/Dashboard/ReviewMeal/ReviewMeal';
import UpdateReview from '../pages/UpdateReview/UpdateReview';
import AllMeals from '../pages/Dashboard/AllMeal/AllMeals';
import UpdateMeal from '../pages/Dashboard/UpdateMeal/UpdateMeal';
import AllReviews from '../pages/Dashboard/AllReviews/AllReviews';
import AllFoodRequest from '../pages/Dashboard/AllFoodRequest/AllFoodRequest';
import UpcomingMeals from '../pages/Dashboard/UpcomingMeals/UpcomingMeals';
import PrivateRoutes from './PrivateRoutes';
import AdminRoute from './AdminRoute';



const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage />,
      children: [
        {
        path: "/",
        element: <Home/>,
        },
        {
        path: "/register",
        element: <Registration/>
        },
        {
        path: "/login",
        element:<Login/>
        },
        {
        path: "/allMeal",
        element:<AllMeal/>
        },
        {
         path:"/meal/:id",
         element:<PerMealDetails/>,
         loader: ({params}) => fetch(`https://hostel-management-server-eight.vercel.app/mealDetails/${params.id}`)
        },
        {
        path: "/upcomingMeal",
        element:<UpcomingMeal/>
        },
        {
        path: "/payment",
        element:<Payment/>
        },
        {
          path: 'checkout/:package',
          element:<PrivateRoutes><Checkout></Checkout></PrivateRoutes>  ,
          loader: ({params}) => fetch(`https://hostel-management-server-eight.vercel.app/membershipPackage/${params.package}`)
        },
        {
          path: "/UpdateReview/:id",
          element:<UpdateReview/>,
          loader: ({params}) => fetch(`https://hostel-management-server-eight.vercel.app/UpdateReview/${params.id}`),
        },
      ]
    },
    {
      path:"dashboard",
      element:<PrivateRoutes> <Dashboard/></PrivateRoutes>,
      children:[
        //ADMIN
        {
          path:"allUser",
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>   
        },
        {
          path:"addMeal",
          element:<AdminRoute><AddMeal/></AdminRoute> 
        },
        // for all
        {
          path:"UserProfile",
          element:<UserProfile/>
        },
        {
          path:"requestedMeal",
          element:<RequestedMeal/>
        },
        {
          path:"reviewMeal",
          element:<ReviewMeal/>
        },
        {
          path:"allMeals",
          element:<AdminRoute><AllMeals/></AdminRoute>,
        },
        {
          path:"allReviews",
          element:<AdminRoute><AllReviews/></AdminRoute>
        },
        {
          path:"allFoodRequest",
          element:<AdminRoute><AllFoodRequest/></AdminRoute>
        },
        {
          path:"upcomingMeals",
          element: <UpcomingMeals/>
        },
        {
          path: 'updateItem/:id',
          element: <UpdateMeal/>,
          loader: ({params}) => fetch(`https://hostel-management-server-eight.vercel.app/menuItem/${params.id}`)
        },
       

      ]
    }
  ]);
  

export default Routes;// Updated
