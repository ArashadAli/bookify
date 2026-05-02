import {
  collection, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc,
  onSnapshot, doc, query, where, orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { uploadImage } from './cloudinaryService.js';

const BOOKS_COL = 'books';
const USERS_COL = 'userDetail';

/* ── Subscribe to all books in real time ── */
export const subscribeToBooks = (callback) => {
  const ref = collection(db, BOOKS_COL);
  return onSnapshot(ref, (snapshot) => {
    const books = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(books);
  });
};

/* ── Fetch all books once ── */
export const fetchAllBooks = async () => {
  const snap = await getDocs(collection(db, BOOKS_COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* ── Fetch books by category (Firestore query) ── */
export const fetchBooksByCategory = async (category) => {
  const q    = query(collection(db, BOOKS_COL), where('bookCategory', '==', category));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* ── Fetch a single book by ID ── */
export const fetchBookById = async (bookId) => {
  const snap = await getDoc(doc(db, BOOKS_COL, bookId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

/* ── Fetch books uploaded by a specific user ── */
export const fetchUserBooks = async (userId) => {
  const ref  = collection(db, USERS_COL, userId, 'books');
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* ── Add a new book ── */
export const addBook = async (userId, bookDetails) => {
  const { bookImage, ...rest } = bookDetails;
  const imageUrl = await uploadImage(bookImage);

  const payload = {
    ...rest,
    bookURL: imageUrl,
    userID: userId,
    likes: 0,
    bookLikedUser: {},
    createdAt: Date.now(),
  };

  // Top-level books collection
  const bookRef = await addDoc(collection(db, BOOKS_COL), payload);

  // Mirror in user's subcollection for fast "my books" queries
  await setDoc(
    doc(db, USERS_COL, userId, 'books', bookRef.id),
    { ...payload, uploadedBookRefID: bookRef.id }
  );

  return bookRef.id;
};

/* ── Delete a book ── */
export const deleteBook = async (userId, bookId) => {
  await deleteDoc(doc(db, BOOKS_COL, bookId));
  await deleteDoc(doc(db, USERS_COL, userId, 'books', bookId));
};

/* ── Toggle like on a book ── */
export const toggleLike = async (bookId, userId) => {
  const bookRef  = doc(db, BOOKS_COL, bookId);
  const bookSnap = await getDoc(bookRef);
  if (!bookSnap.exists()) return;

  const data      = bookSnap.data();
  const likedBy   = { ...(data.bookLikedUser || {}) };
  let   likes     = data.likes ?? 0;

  if (likedBy[userId]) {
    delete likedBy[userId];
    likes = Math.max(0, likes - 1);
  } else {
    likedBy[userId] = true;
    likes += 1;
  }

  await updateDoc(bookRef, { bookLikedUser: likedBy, likes });
};