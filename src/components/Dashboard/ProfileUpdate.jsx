import { useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
const UserFormModal = ({ onClose }) => {
    const firebase = useFirebase();
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [profilePic,setProfilePic] = useState("")

    const handleProfile = async(e) => {
        e.preventDefault();
        try {
          const response = await firebase.adduserDetail(name,phone,profilePic)
          console.log("update profile : ",response)
          resetFields();
          onClose()
        } catch (error) {
          console.log("error on updating the profile : ",error)
        }
    }
    const resetFields = () => {
        setName("");
        setPhone("")
        setProfilePic("")
    }
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:bg-black/5 rounded-full p-2 transition-all duration-200"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          User Details
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              value={name}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              value={phone}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-700 file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-xl file:cursor-pointer hover:file:bg-blue-700 transition-all duration-200"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>


          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleProfile}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
