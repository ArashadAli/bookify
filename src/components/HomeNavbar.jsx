import { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  BookOpen,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  Book,
  Heart,
  Zap,
  Globe,
  Sparkles,
  Users,
} from "lucide-react";

function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Shop", href: "/shop", Icon: ShoppingCart },
    {
      name: "Sell Books",
      href: "#",
      Icon: BookOpen,
      hasDropdown: true,
      dropdownItems: [
        { name: "Fiction", href: "/sell/fiction", Icon: Book },
        { name: "Children's Books", href: "/sell/children", Icon: Heart },
        { name: "Science Fiction", href: "/sell/scifi", Icon: Zap },
        { name: "Non-Fiction", href: "/sell/nonfiction", Icon: Globe },
        { name: "Fantasy", href: "/sell/fantasy", Icon: Sparkles },
      ],
    },
    { name: "About", href: "/about", Icon: Users },
  ];

  const NavLink = ({ name, href, Icon, mobile, hasDropdown, dropdownItems }) => {
    if (mobile) {
      if (hasDropdown) {
        return (
          <div>
            <button
              onClick={() => setMobileDropdown(!mobileDropdown)}
              className="no-underline flex w-full items-center justify-between px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-sky-50"
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-sky-600" />
                <span>{name}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDropdown && (
              <div className="pl-8 pr-4 pb-2 space-y-2">
                {dropdownItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="no-underline flex items-center space-x-2 p-2 rounded-lg hover:bg-sky-50 text-gray-700"
                  >
                    <item.Icon className="w-4 h-4 text-sky-600" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <a
          href={href}
          className="no-underline flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-sky-50"
        >
          <Icon className="w-5 h-5 text-sky-600" />
          <span>{name}</span>
        </a>
      );
    }

    if (hasDropdown) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="no-underline flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-sky-100 font-medium hover:bg-sky-600/30"
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2">
              {dropdownItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="no-underline flex items-center space-x-3 p-2 rounded-lg hover:bg-sky-50"
                >
                  <item.Icon className="w-5 h-5 text-sky-600" />
                  <span className="text-gray-700 font-medium">{item.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        href={href}
        className="no-underline flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-sky-100 font-medium hover:bg-sky-600/30"
      >
        <Icon className="w-5 h-5" />
        <span>{name}</span>
      </a>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 shadow-md ${
        scrolled
          ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-xl"
          : "bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/" className="no-underline text-2xl font-extrabold text-white">
            Bookify
          </a>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-lg">
              <div className="relative bg-white rounded-xl shadow-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for your next great read..."
                  className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-gray-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
            <a
              href="/login"
              className="no-underline ml-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:to-cyan-600 flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </a>
            <a
              href="/signup"
              className="no-underline ml-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Signup</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-lg border-t border-gray-200">
          {/* Mobile Search */}
          <div className="px-4 py-4">
            <div className="relative bg-gray-100 rounded-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="px-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.name} {...item} mobile />
            ))}
            <a
              href="/login"
              className="no-underline flex items-center justify-center w-full p-3 mt-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md"
            >
              <LogIn className="w-5 h-5 mr-2" /> Login
            </a>
            <a
              href="/signup"
              className="no-underline flex items-center justify-center w-full p-3 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Signup
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
