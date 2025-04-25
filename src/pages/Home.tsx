
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LatestProjectsSection from '@/components/home/LatestProjectsSection';
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ProjectHub | UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <LatestProjectsSection />
          <UpcomingEventsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
