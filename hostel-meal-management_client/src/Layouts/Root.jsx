import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';
import { Outlet } from 'react-router-dom';
//import Footer from '../pages/Footer/Footer';

const Root = () => {
    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 1300,
            easing: 'ease-in-sine',
            delay: 100,
        });
      }, [])
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Root;// Updated
