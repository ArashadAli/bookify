import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import MainContent from './MainContent.jsx';
import { useFirebase } from '../../context/Firebase.jsx';

const BookDashboard = () => {
  const firebase = useFirebase();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleDeleteBook = (id) => setBooks(books.filter((b) => b.id !== id));
  const handleEditBook = (id) => alert(`Edit book with ID: ${id}`);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if(firebase.isLoggedIn && firebase.loggedInUser){
      firebase.listUserBook().then((book) => {
        console.log("user book : ",book)
        setBooks(book)
      })
    }
  },[firebase.isLoggedIn, firebase.loggedInUser])

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MainContent
          books={books}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleEditBook={handleEditBook}
          handleDeleteBook={handleDeleteBook}
        />
      </div>
    </div>
  );
};

export default BookDashboard;
