import { Webhook } from "svix";
import User from "../models/User.js";

const clerkwebHooks = async (req, res) => {
  try {
    //Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting Data from request body
    const { data, type } = req.body;

    //Switch cases for different events
    switch (type) {
      //Handle user created event
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.create(userData);
        break;
      }

      //Handle user updated event
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      //Handle user deleted event
      case "user.deleted": {
        await User.findByIdAndDelete(data.id, userData);
        break;
      }

      //Handle unknown event
      default:
        break;
    }
    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkwebHooks;
