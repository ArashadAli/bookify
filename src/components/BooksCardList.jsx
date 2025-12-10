import { Heart, ShoppingCart, Star, Bookmark, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase.jsx";

export default function BooksCardList() {
  const [allBooks, setAllBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = firebase.listAllBookRealtime((books) => {
      setAllBooks(books);
    });
    return () => unsubscribe(); // stop listening on unmount
  }, []);

  const handleLikes = async (bookId) => {
    if (!firebase.isLoggedIn) {
      alert("Please log in before liking the product!");
      return;
    }
    await firebase.likesHandle(bookId);
  };

  const addCart = async (bookId) => {
    if(!firebase.isLoggedIn){
      alert("Please log in before adding the product into the cart!")
    }
    await firebase.addToCart(bookId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-4">
          Books Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of amazing books
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {allBooks.map((book, index) => {
          const isLiked = book.bookLikedUser?.[firebase.loggedInUser?.uid]; // check if this user liked it

          return (
            <div
              key={book.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 transform hover:-translate-y-1 hover:scale-[1.01]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-pink-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

              {/* Book Image */}
              <div className="relative p-4 flex justify-center">
                <div className="relative group/image">
                  <img
                    src={book.bookURL}
                    alt={book.bookName}
                    className="w-40 h-44 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-400 transform group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition transform hover:scale-110">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition transform hover:scale-110">
                      <Bookmark className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 relative z-10">
                <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300">
                  {book.bookName}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{book.authorName}</p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-gray-700">
                    4.8
                  </span>
                  <span className="ml-1 text-xs text-gray-500">(100)</span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{book.bookPrice}
                  </span>
                </div>

                
                <div className="flex items-center justify-between">
                  
                  <button
                    onClick={() => handleLikes(book.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border transition text-sm
                      ${
                        isLiked
                          ? "bg-red-100 text-red-600 border-red-200 hover:bg-red-200 hover:text-red-700"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      }`}
                  >
                    <Heart
                      className={`w-3 h-3 transition ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                    <span>{book.likes || 0}</span>
                  </button>

                  
                  <button className="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow hover:from-sky-600 hover:to-cyan-600 transform hover:scale-105 text-sm"
                  onClick={() => addCart(book.id)}
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}