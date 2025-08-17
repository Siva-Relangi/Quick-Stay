import { assets, cities } from "../assets/assets"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext()
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const validateDates = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (checkInDate < today) {
      toast.error("Check-in date cannot be in the past")
      return false
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date")
      return false
    }

    return true
  }

  const onSearch = async (e) => {
    e.preventDefault()

    if (!destination.trim()) {
      toast.error("Please select a destination")
      return
    }

    if (checkIn && checkOut && !validateDates()) {
      return
    }

    setIsLoading(true)

    try {
      const searchParams = new URLSearchParams({
        destination: destination.trim(),
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
        ...(guests && { guests: guests.toString() }),
      })

      navigate(`/rooms?${searchParams.toString()}`)

      try {
        const token = await getToken()
        if (token) {
          await axios.post(
            "/api/user/store-recent-search",
            {
              recentSearchedCity: destination.trim(),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          setSearchedCities((prevSearchedCities) => {
            const updatedSearchedCities = [...prevSearchedCities, destination.trim()]
            if (updatedSearchedCities.length > 3) {
              updatedSearchedCities.shift()
            }
            return updatedSearchedCities
          })
        }
      } catch (apiError) {
        console.warn("Failed to save search history:", apiError)
      }
    } catch (error) {
      toast.error("Search failed. Please try again.")
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">The ultimate Hotel Experience</p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today
      </p>

      <form
        onSubmit={onSearch}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto"
        role="search"
        aria-label="Hotel search form"
      >
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon || "/placeholder.svg"} alt="" className="h-4" aria-hidden="true" />
            <label htmlFor="destinationInput" className="font-medium">
              Destination
            </label>
          </div>
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Where are you going?"
            required
            aria-describedby="destination-help"
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          <div id="destination-help" className="sr-only">
            Select your destination from the available cities
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon || "/placeholder.svg"} alt="" className="h-4" aria-hidden="true" />
            <label htmlFor="checkIn" className="font-medium">
              Check in
            </label>
          </div>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="checkin-help"
          />
          <div id="checkin-help" className="sr-only">
            Select your check-in date
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon || "/placeholder.svg"} alt="" className="h-4" aria-hidden="true" />
            <label htmlFor="checkOut" className="font-medium">
              Check out
            </label>
          </div>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || today}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="checkout-help"
          />
          <div id="checkout-help" className="sr-only">
            Select your check-out date
          </div>
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests" className="font-medium">
            Guests
          </label>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1"
            aria-describedby="guests-help"
          />
          <div id="guests-help" className="sr-only">
            Number of guests (1-10)
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Search for hotels"
        >
          <img src={assets.searchIcon || "/placeholder.svg"} alt="" className="h-7" aria-hidden="true" />
          <span>{isLoading ? "Searching..." : "Search"}</span>
        </button>
      </form>
    </div>
  )
}

export default Hero
