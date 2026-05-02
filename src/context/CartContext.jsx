import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, where, getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};

export const CartProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  /* ── Firestore ref helper ── */
  const cartRef = useCallback(() => {
    if (!user) return null;
    return collection(db, 'userDetail', user.uid, 'cart');
  }, [user]);

  /* ── Fetch cart on login ── */
  useEffect(() => {
    if (!isLoggedIn || !user) {
      setCartItems([]);
      return;
    }
    const fetchCart = async () => {
      setCartLoading(true);
      try {
        const ref  = cartRef();
        const snap = await getDocs(ref);
        const items = snap.docs.map((d) => ({ cartDocId: d.id, ...d.data() }));
        setCartItems(items);
      } catch (err) {
        console.error('Cart fetch error:', err);
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn, user, cartRef]);

  /* ── Add to cart ── */
  const addToCart = useCallback(async (bookId) => {
    if (!isLoggedIn || !user) {
      toast.error('Please log in to add books to your cart.');
      return false;
    }

    // Fetch book details
    const bookSnap = await getDoc(doc(db, 'books', bookId));
    if (!bookSnap.exists()) {
      toast.error('Book not found.');
      return false;
    }
    const bookData = bookSnap.data();

    // Self-purchase guard
    if (bookData.userID === user.uid) {
      toast.error("You can't purchase your own book.");
      return false;
    }

    // Duplicate check (client-side fast path)
    const alreadyIn = cartItems.some((item) => item.bookID === bookId);
    if (alreadyIn) {
      toast('This book is already in your cart.', { icon: '🛒' });
      return false;
    }

    try {
      const ref  = cartRef();
      const snap = await getDocs(ref);
      const serverDup = snap.docs.some((d) => d.data().bookID === bookId);
      if (serverDup) {
        toast('This book is already in your cart.', { icon: '🛒' });
        return false;
      }
      const newDoc = await addDoc(ref, {
        ...bookData,
        bookID: bookId,
        addedAt: Date.now(),
      });
      setCartItems((prev) => [
        ...prev,
        { cartDocId: newDoc.id, ...bookData, bookID: bookId, addedAt: Date.now() },
      ]);
      toast.success('Added to cart!');
      return true;
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error('Failed to add to cart.');
      return false;
    }
  }, [isLoggedIn, user, cartItems, cartRef]);

  /* ── Remove from cart ── */
  const removeFromCart = useCallback(async (cartDocId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'userDetail', user.uid, 'cart', cartDocId));
      setCartItems((prev) => prev.filter((item) => item.cartDocId !== cartDocId));
      toast.success('Removed from cart.');
    } catch (err) {
      console.error('Remove from cart error:', err);
      toast.error('Failed to remove item.');
    }
  }, [user]);

  /* ── Clear entire cart (after checkout) ── */
  const clearCart = useCallback(async () => {
    if (!user) return;
    try {
      const ref  = cartRef();
      const snap = await getDocs(ref);
      const deletes = snap.docs.map((d) => deleteDoc(doc(db, 'userDetail', user.uid, 'cart', d.id)));
      await Promise.all(deletes);
      setCartItems([]);
    } catch (err) {
      console.error('Clear cart error:', err);
    }
  }, [user, cartRef]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + Number(item.bookPrice || 0), 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    cartLoading,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};