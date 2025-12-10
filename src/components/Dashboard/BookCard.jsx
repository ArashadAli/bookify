import { Edit3, Trash2, Eye, Heart } from "lucide-react";
import { useEffect, useState  } from "react";
import { useFirebase } from "../../context/Firebase.jsx";
const BookCard = ({ book, onDelete }) => {
  const [bookLikes, setBookLikes] = useState(0)
  const [bookViews, setBookViews] = useState(0)
  const firebase = useFirebase()
useEffect(() => {
  firebase.returnBookById(book.id).then((b) => {
    setBookLikes(b.likes)
    setBookViews(b.likes)
  })
},[])
  return (
    <div className="group bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-64">
      {/* Book Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={book.bookURL}
          alt={book.bookName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Action Buttons (top right) */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 text-red-600 shadow-sm transition"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base truncate mb-0.5">
          {book.bookName}
        </h3>
        <p className="text-sm text-gray-600 truncate mb-1">
          {book.authorName}
        </p>
        <p className="text-xs text-gray-500 truncate mb-3">
          {book.bookCategory}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ₹{book.bookPrice}
          </span>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {bookViews ? bookViews : 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {bookLikes ? bookLikes : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
