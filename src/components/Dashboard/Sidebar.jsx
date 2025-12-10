import { Plus, LogOut,HouseIcon,Bell,BaggageClaim } from 'lucide-react';
import { useFirebase } from '../../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const handleLogout = async() => {
      await firebase.logoutUser();
      window.location.replace("/")
      // navigate("/")
    }
    const AddBook = () => {
      if(firebase.isLoggedIn){
        navigate("/dashboard/addbook")
      }
    }
const navigateToCart = () => {
  if (firebase.loggedInUser && firebase.isLoggedIn) {
    navigate("/dashboard/cart");
  } else {
    alert("Please log in to view your cart.");
    navigate("/");
  }
};

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 
           bg-white/80 backdrop-blur-xl border-r border-white/20 
           transition-all duration-300 ease-out`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Bookify
          </h2>

          {/* Menu */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
            onClick={() => navigate("/")}
            >
            <HouseIcon className="h-5 w-5" />
            <span>Go To Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
          onClick={AddBook}
          >
            <Plus className="h-5 w-5" />
            <span>Add Book</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-black/5 rounded-xl"
          onClick={navigateToCart}
          >
            <BaggageClaim className="h-5 w-5" />
            <span>My Cart</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-black/5 rounded-xl">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>

          <div className="border-t border-gray-200 pt-4">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
            onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
