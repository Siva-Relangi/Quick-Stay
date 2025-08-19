import { Webhook } from "svix"
import User from "../models/User.js"

const clerkwebHooks = async (req, res) => {

  try {
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error("CLERK_WEBHOOK_SECRET is not set in environment variables")
      return res.status(500).json({ success: false, message: "Webhook secret not configured" })
    }

    //Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    //Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    }

    const body = req.body
    const bodyString = Buffer.isBuffer(body) ? body.toString() : JSON.stringify(body)

    console.log("[v0] Body string:", bodyString)

    //verifying headers
    await whook.verify(bodyString, headers)

    //Getting Data from request body
    const { data, type } = JSON.parse(bodyString)

    if (!data || !data.id || !data.email_addresses || !data.email_addresses[0]) {
      console.error("Invalid user data received from webhook:", data)
      return res.status(400).json({ success: false, message: "Invalid user data" })
    }

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username:
        data.first_name && data.last_name
          ? `${data.first_name} ${data.last_name}`.trim()
          : data.first_name || data.last_name || data.email_addresses[0].email_address.split("@")[0],
      image: data.image_url || "",
    }

    console.log(`Processing webhook event: ${type} for user: ${userData.email}`)
    console.log("User data to be saved:", userData)

    //Switch cases for different events
    switch (type) {
      //Handle user created event
      case "user.created": {
        try {
          const newUser = await User.create(userData)
          console.log("User created successfully:", newUser)
        } catch (createError) {
          console.error("Error creating user:", createError)
          throw createError
        }
        break
      }

      //Handle user updated event
      case "user.updated": {
        const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true })
        console.log("User updated successfully:", updatedUser)
        break
      }

      //Handle user deleted event
      case "user.deleted": {
        await User.findByIdAndDelete(data.id)
        console.log("User deleted successfully:", data.id)
        break
      }

      //Handle unknown event
      default:
        console.log("Unknown webhook event type:", type)
        break
    }
    res.json({ success: true, message: "Webhook processed successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export default clerkwebHooks
