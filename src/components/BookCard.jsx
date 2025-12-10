const BookCard = ({ title, price, image }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden p-3 hover:shadow-lg transition">
      <img src={image} alt={title} className="rounded-lg w-full h-40 object-cover" />
      <h4 className="mt-3 font-semibold text-gray-800">{title}</h4>
      <p className="text-orange-600 font-bold">${price}</p>
      <button className="w-full mt-3 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
        Buy Now
      </button>
    </div>
  );
};

export default BookCard;
