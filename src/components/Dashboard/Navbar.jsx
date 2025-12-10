import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import UserFormModal from './ProfileUpdate.jsx';
import { useFirebase } from '../../context/Firebase.jsx';
const Navbar = ({ searchQuery, setSearchQuery }) => {
  const firebase = useFirebase();
  const updatedProfile = firebase.userProfile;
  const currentLoggedInUser = firebase.loggedInUser
  // console.log("updatedProfile : ",updatedProfile)
  // console.log("navbar loggedinuser updatedProfile : ",currentLoggedInUser)
    const [profile,setProfile] = useState(false)
    const openProfileUpdate = () => {
        setProfile(true);
    }

     if(profile){
    return <UserFormModal onClose={() => setProfile(false)}/>
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <div className="relative cursor-pointer"
          onClick={openProfileUpdate}
          >
            <img
              src={updatedProfile?updatedProfile.profile_url : currentLoggedInUser.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <span className="text-gray-900 font-bold text-base">{updatedProfile ? (updatedProfile.name ? updatedProfile.name : currentLoggedInUser.displayName) : currentLoggedInUser.displayName}</span>
            <p className="text-gray-500 text-sm font-medium">Admin</p>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative hidden md:block w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm font-semibold
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:bg-white transition-all duration-200 w-full text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 text-gray-600 hover:text-gray-800 hover:bg-black/5 rounded-xl">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              3
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
