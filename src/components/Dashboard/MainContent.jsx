import { Filter } from 'lucide-react';
import BookCard from './BookCard.jsx';

const MainContent = ({ books, searchQuery, handleEditBook, handleDeleteBook }) => {
  console.log("main content book : ",books)
  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
            <p className="text-gray-600">Manage your collection and track performance</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-xl hover:shadow-md">
            <Filter className="h-4 w-4" /> <span className="text-sm">Filter</span>
          </button>
        </div>
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books
            .filter((book) =>
              book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((book) => (
              <BookCard key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No books uploaded yet</h3>
            <p className="text-gray-600 mb-8">Start building your library by adding your first book</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
