import { Outlet } from "react-router-dom"
import HomeNavbar from "../components/HomeNavbar"
import DashboardNavbar from "../components/DashboardNavbar.jsx"
import { useFirebase } from "../context/Firebase.jsx"
import { useEffect, useState } from "react"
const HomeLayout = () => {
    const [showDashboard,setShowDashboard] = useState(false);
    const firebase = useFirebase();
    useEffect(() => {
        if(firebase.isLoggedIn){
            setShowDashboard(true);
        }
    },[firebase.isLoggedIn,firebase.loggedInUser])
    return(
        <>
        {showDashboard?<DashboardNavbar/>:<HomeNavbar/>}
        <main className="pt-20">
            <Outlet/>
        </main>
        </>
    )
}

export default HomeLayout