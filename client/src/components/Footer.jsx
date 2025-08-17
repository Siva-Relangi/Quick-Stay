import { useState } from "react"
import { assets } from "../assets/assets"
import toast from "react-hot-toast"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }

    if (!validateEmail(email.trim())) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubscribing(true)

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Successfully subscribed to newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32" role="contentinfo">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img
            src={assets.logo || "/placeholder.svg"}
            alt="QuickStay logo"
            className="mb-4 h-8 md:h-9 invert opacity-80"
          />
          <p className="text-sm">
            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private
            islands.
          </p>
          <div className="flex items-center gap-3 mt-4" role="list" aria-label="Social media links">
            <a
              href="https://instagram.com/quickstay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <img
                src={assets.instagramIcon || "/placeholder.svg"}
                alt=""
                className="w-6 hover:opacity-70 transition-opacity"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://facebook.com/quickstay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              <img
                src={assets.facebookIcon || "/placeholder.svg"}
                alt=""
                className="w-6 hover:opacity-70 transition-opacity"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://twitter.com/quickstay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <img
                src={assets.twitterIcon || "/placeholder.svg"}
                alt=""
                className="w-6 hover:opacity-70 transition-opacity"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://linkedin.com/company/quickstay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
            >
              <img
                src={assets.linkendinIcon || "/placeholder.svg"}
                alt=""
                className="w-6 hover:opacity-70 transition-opacity"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <nav aria-labelledby="company-heading">
          <h3 id="company-heading" className="font-playfair text-lg text-gray-800">
            COMPANY
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="/about" className="hover:text-gray-700 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-gray-700 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="/press" className="hover:text-gray-700 transition-colors">
                Press
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-gray-700 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="/partners" className="hover:text-gray-700 transition-colors">
                Partners
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="support-heading">
          <h3 id="support-heading" className="font-playfair text-lg text-gray-800">
            SUPPORT
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="/help" className="hover:text-gray-700 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="/safety" className="hover:text-gray-700 transition-colors">
                Safety Information
              </a>
            </li>
            <li>
              <a href="/cancellation" className="hover:text-gray-700 transition-colors">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-700 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/accessibility" className="hover:text-gray-700 transition-colors">
                Accessibility
              </a>
            </li>
          </ul>
        </nav>

        <div className="max-w-80">
          <h3 className="font-playfair text-lg text-gray-800">STAY UPDATED</h3>
          <p className="mt-3 text-sm">Subscribe to our newsletter for inspiration and special offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex items-center mt-4">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
              placeholder="Your email"
              disabled={isSubscribing}
              aria-describedby="newsletter-help"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Subscribe to newsletter"
            >
              <img src={assets.arrowIcon || "/placeholder.svg"} alt="" className="w-3.5 invert" aria-hidden="true" />
            </button>
          </form>
          <div id="newsletter-help" className="sr-only">
            Enter your email to receive our newsletter with special offers and updates
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-8" />

      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} QuickStay. All rights reserved.</p>
        <nav aria-label="Legal links">
          <ul className="flex items-center gap-4">
            <li>
              <a href="/privacy" className="hover:text-gray-700 transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-700 transition-colors">
                Terms
              </a>
            </li>
            <li>
              <a href="/sitemap" className="hover:text-gray-700 transition-colors">
                Sitemap
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
