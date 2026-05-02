import {
  collection, addDoc, getDocs, query, where, orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const ORDERS_COL = 'orders';

/**
 * Create a new order document in Firestore.
 * @param {string}   userId
 * @param {Array}    cartItems  — full cart item objects
 * @param {Object}   address    — { name, phone, street, city, state, pincode }
 * @returns {string} orderId
 */
export const createOrder = async (userId, cartItems, address) => {
  const payload = {
    userId,
    items: cartItems.map((item) => ({
      bookId:      item.bookID,
      bookName:    item.bookName,
      authorName:  item.authorName,
      bookPrice:   item.bookPrice,
      bookURL:     item.bookURL,
      bookCategory:item.bookCategory,
    })),
    address,
    paymentStatus: 'success',
    total: cartItems.reduce((sum, item) => sum + Number(item.bookPrice || 0), 0),
    createdAt: Date.now(),
  };

  const ref = await addDoc(collection(db, ORDERS_COL), payload);
  return ref.id;
};
export const fetchUserOrders = async (userId) => {
  const q    = query(
    collection(db, ORDERS_COL),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};