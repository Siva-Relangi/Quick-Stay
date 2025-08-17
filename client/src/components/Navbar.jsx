import { useClerk, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/#" },
    { name: "About", path: "/#" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignUp } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => {
      if (location.pathname !== "/") return true;
      return prev;
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link to="/" aria-label="QuickStay Home">
        <img
          src={assets.logo || "/placeholder.svg"}
          alt="QuickStay logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            } ${location.pathname === link.path ? "font-semibold" : ""}`}
            aria-current={location.pathname === link.path ? "page" : undefined}
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer hover:bg-opacity-10 hover:bg-current transition-all ${
              isScrolled ? "text-black border-black" : "text-white border-white"
            }`}
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            aria-label={isOwner ? "Go to dashboard" : "List your hotel"}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignUp}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isScrolled
                ? "bg-black text-white focus:ring-black"
                : "text-black bg-white focus:ring-white"
            }`}
            aria-label="Login or sign up"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <img
            src={assets.menuIcon || "/placeholder.svg"}
            alt=""
            className={`${isScrolled && "invert"} h-4`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <button
          className="absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded p-1"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <img
            src={assets.closeIcon || "/placeholder.svg"}
            alt=""
            className="h-6"
            aria-hidden="true"
          />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={`hover:text-gray-600 transition-colors ${
              location.pathname === link.path ? "font-bold text-black" : ""
            }`}
            aria-current={location.pathname === link.path ? "page" : undefined}
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            className="border border-gray-300 px-4 py-1 text-sm font-light rounded-full cursor-pointer hover:bg-gray-50 transition-all"
            onClick={() => {
              setIsMenuOpen(false);
              isOwner ? navigate("/owner") : setShowHotelReg(true);
            }}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {!user && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openSignUp();
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
