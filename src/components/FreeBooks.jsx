const FreeBooks = () => {
  const freeBooks = ["Alice in Wonderland", "The Catcher in the Rye", "Clockwork Orange", "Pride & Prejudice"];
  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6">
      <h3 className="font-bold text-lg mb-3 text-gray-800">Free Books</h3>
      <ul className="space-y-2">
        {freeBooks.map((book, idx) => (
          <li key={idx} className="text-gray-700 hover:text-orange-600 cursor-pointer">
            {book}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreeBooks;
