
import BookDashboard from "../components/Dashboard/BookDashboard.jsx";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const firebase = useFirebase()
  const loggedInUser = firebase.loggedInUser;
  console.log("dashboard current logged in user : ",loggedInUser)

  useEffect(() => {
    if (!firebase.isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  },[firebase.isLoggedIn,navigate,location])

  if(!firebase.isLoggedIn){
    return null
  }
  return (
   <>
   <BookDashboard/>
   </>
  );
};

export default Dashboard;
