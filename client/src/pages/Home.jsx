import { useEffect } from "react";
import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedDestination from "../components/FeaturedDestination";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";
import Testimonial from "../components/Testimonial";
import { useAppContext } from "../context/AppContext";


const SkeletonRoomCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-48 w-full mb-4">
    {/* Add more divs for image, title, etc. as needed */}
    <div className="h-32 bg-gray-300 rounded-t-xl"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Home = () => {
  const { loading, rooms } = useAppContext();

  return (
    <>
      <Hero />
      <RecommendedHotels />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonRoomCard key={i} />
          ))}
        </div>
      ) : (
        <FeaturedDestination />
      )}
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;