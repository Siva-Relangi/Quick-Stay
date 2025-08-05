import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";

const FeaturedDestination = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard room={room} index={index} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestination;
