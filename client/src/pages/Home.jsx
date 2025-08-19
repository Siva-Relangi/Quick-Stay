import { useEffect } from "react";
import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedDestination from "../components/FeaturedDestination";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";
import Testimonial from "../components/Testimonial";
import { useAppContext } from "../context/AppContext";

const LoadingSpinner = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
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
      <Hero />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
