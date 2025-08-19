import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedDestination from '../components/FeaturedDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';
import RecommendedHotels from '../components/RecommendedHotels';
import { useAppContext } from '../context/AppContext';

const LoadingSpinner = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="loader">Loading...</div>
  </div>
);

const Home = () => {
  const { loading, setLoading, fetchRooms, rooms } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchRooms().finally(() => setLoading(false));
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Hero />
          <RecommendedHotels />
          <FeaturedDestination />
          <ExclusiveOffers />
          <Testimonial />
          <NewsLetter />
        </>
      )}
    </>
  );
};

export default Home;