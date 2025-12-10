import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase.jsx";

const BookFormModal = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [isOpen, setIsOpen] = useState(true);
  const [bookname, setBookname] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const onClose = () => {
    setIsOpen(false);
    navigate("/dashboard");
  };

  const handleBookDetails = async () => {
    if (
      bookname !== "" &&
      bookImage !== "" &&
      bookPrice !== "" &&
      bookCategory !== "" &&
      authorName !== "" &&
      bookDescription !== ""
    ) {
      const newbook = {
        bookName: bookname,
        bookPrice: bookPrice,
        bookCategory: bookCategory,
        authorName: authorName,
        bookImage: bookImage,
        bookDescription: bookDescription,
      };

      await firebase.addNewBook(newbook);
      console.log("Book uploaded successfully.");
      onClose();
    } else {
      alert("FILL ALL THE FIELD");
    }
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4">
        {/* ✅ Full-screen flex wrapper that scrolls on small devices */}
        <div className="w-full h-full flex items-center justify-center overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl w-full 
                          max-w-[95%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
                          p-4 sm:p-6 relative border border-white/20 
                          my-4 sm:my-8 overflow-y-auto max-h-[90vh] sm:max-h-[95vh]">
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all duration-300 hover:rotate-90"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <div className="mb-4 sm:mb-6 text-center">
              <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Add Book
              </h2>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-4">
              {/* Book Name */}
              <div>
                <label className="block text-gray-500 font-bold mb-1 text-xs sm:text-sm">
                  Book Name
                </label>
                <input
                  onChange={(e) => setBookname(e.target.value)}
                  value={bookname}
                  type="text"
                  placeholder="Enter book name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 
                             focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-semibold text-sm sm:text-base"
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-gray-500 font-bold mb-1 text-xs sm:text-sm">
                  Author Name
                </label>
                <input
                  onChange={(e) => setAuthorName(e.target.value)}
                  value={authorName}
                  type="text"
                  placeholder="Enter author name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 
                             focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-semibold text-sm sm:text-base"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-500 font-bold mb-1 text-xs sm:text-sm">
                  Category
                </label>
                <input
                  onChange={(e) => setBookCategory(e.target.value)}
                  value={bookCategory}
                  type="text"
                  placeholder="Enter the category"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 
                             focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 font-semibold text-sm sm:text-base"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-500 font-bold mb-1 text-xs sm:text-sm">
                  Price (₹)
                </label>
                <input
                  onChange={(e) => setBookPrice(e.target.value)}
                  value={bookPrice}
                  type="text"
                  placeholder="Enter price"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 
                             focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-semibold text-sm sm:text-base"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-500 font-bold mb-1 text-xs sm:text-sm">
                  Short Description
                </label>
                <textarea
                  onChange={(e) => setBookDescription(e.target.value)}
                  value={bookDescription}
                  placeholder="Write a short description about the book"
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 
                             focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-semibold resize-none text-sm sm:text-base"
                />
              </div>

              {/* Book Image */}
              <div>
                <label className="block text-gray-500 mb-1 text-xs sm:text-sm font-bold">
                  Book Image
                </label>
                <input
                  onChange={(e) => setBookImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="w-full text-gray-700 text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:border-0 
                             file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white 
                             file:px-3 sm:file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:font-semibold file:shadow-sm
                             hover:file:from-blue-600 hover:file:to-purple-600 file:transition-all file:duration-300 cursor-pointer
                             border border-dashed border-gray-300 rounded-xl py-2 sm:py-2.5 px-2 sm:px-3 bg-gray-50 hover:border-gray-400 transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm
                           hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl 
                           hover:scale-[1.01] active:scale-[0.97] mt-3 sm:mt-4"
                onClick={handleBookDetails}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BookFormModal;
