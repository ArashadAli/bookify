import { Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartBooks = async () => {
      const books = await firebase.fetchCartBook();
      setCartItems(books);
      console.log("Fetched cart books:", books);
    };
    loadCartBooks();
  }, [firebase]);

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.bookPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex justify-center items-start py-12 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-[0_8px_24px_rgb(0,0,0,0.05)] p-6 sm:p-10 relative overflow-hidden">
        <div className="relative mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            🛒 Your Cart
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Review your selected books before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500 relative">
            <p className="text-lg font-medium">Your cart is empty 😔</p>
            <p className="text-sm text-gray-400 mt-2">
              Start adding books you love!
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg 
                         hover:scale-[1.02] active:scale-[0.97]"
            >
              Go Back
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {cartItems.map((book) => (
                <div
                  key={book.id}
                  className="group bg-white/90 backdrop-blur-lg border border-sky-100 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative h-52 bg-gray-100">
                    <img
                      src={book.bookURL}
                      alt={book.bookName}
                      className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      title="Remove"
                      className="absolute top-2 right-2 p-2 bg-white/90 rounded-lg hover:bg-red-50 text-red-600 transition shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 text-base truncate mb-1">
                      {book.bookName}
                    </h3>
                    <p className="text-sm text-gray-600">{book.authorName}</p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">
                      {book.bookCategory}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{book.bookPrice}
                      </span>

                      <button className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/90 backdrop-blur-xl border border-sky-100 rounded-2xl p-5 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500">Total Amount</p>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{total.toFixed(2)}
                </h2>
              </div>

              <button className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-sm sm:text-base hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97]">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
