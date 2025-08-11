import { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain view": false,
      "Pool Access": false,
    },
  });
  return (
    <div>
      <form>
        <Title
          align="left"
          font="outfit"
          title="Add Room"
          subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
        />

        {/* Upload Area For Images */}
        <p className="text-gray-800 mt-10">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt=""
                className="max-h-13 cursor-pointer opacity-80"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                id={`roomImage${key}`}
                hidden
              />
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
