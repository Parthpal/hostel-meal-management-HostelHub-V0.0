import React from 'react';
import Header from './Shared/Header';
import Footer from '../Footer/Footer';
import Banner from './Shared/Banner/Banner';
import WorkSection from './Shared/WorkSection';
import MembsershipSection from './Shared/MembsershipSection';
import MealCategory from './Shared/MealCategory';

const Home = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <WorkSection/>
            <MealCategory/>
            <MembsershipSection/>
            <Footer/>
        </div>
    );
};

export default Home;// Updated
