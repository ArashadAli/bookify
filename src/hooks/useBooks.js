import { useState, useEffect, useMemo, useCallback } from 'react';
import { subscribeToBooks } from '../services/bookService.js';
import { useDebounce } from './useDebounce.js';

export const CATEGORIES = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  "Children's",
  'Biography',
  'History',
  'Self-Help',
  'Romance',
  'Horror',
  'Textbook',
  'Other',
];


export const useBooks = () => {
  const [allBooks, setAllBooks]         = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [category, setCategory]         = useState('All');

  const debouncedQuery = useDebounce(searchQuery, 350);

  // Subscribe to real-time updates once
  useEffect(() => {
    const unsub = subscribeToBooks((books) => {
      setAllBooks(books);
      setBooksLoading(false);
    });
    return unsub;
  }, []);

  // Client-side filter: search + category (efficient — only re-runs when deps change)
  const filteredBooks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return allBooks.filter((book) => {
      const matchCat = category === 'All' || book.bookCategory === category;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        book.bookName?.toLowerCase().includes(q) ||
        book.authorName?.toLowerCase().includes(q) ||
        book.bookCategory?.toLowerCase().includes(q)
      );
    });
  }, [allBooks, debouncedQuery, category]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setCategory('All');
  }, []);

  return {
    allBooks,
    filteredBooks,
    booksLoading,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    clearFilters,
  };
};