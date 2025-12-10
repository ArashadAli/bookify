const AuthorsList = () => {
  const authors = ["Stephen King", "Agatha Christie", "J.K. Rowling", "Dan Brown", "Paulo Coelho"];
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <h3 className="font-bold text-lg mb-3 text-gray-800">Authors</h3>
      <ul className="space-y-2">
        {authors.map((author, idx) => (
          <li key={idx} className="text-gray-700 hover:text-orange-600 cursor-pointer">
            {author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
