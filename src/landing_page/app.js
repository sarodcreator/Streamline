import React from 'react';
import Trend from './Trending_list/trend'
import Content from './Content/content';
import Hero from './Hero/nav';
import Faq from './FAQ/faq';
import Footer from './Footer/footer';


const landingPage = () => {
    return (
        <>
            <Hero />
            <Content />
            <Trend />
            <Faq />
            <Footer />
        </>
    )
};

export default landingPage;