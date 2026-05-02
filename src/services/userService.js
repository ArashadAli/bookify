import {
  doc, getDoc, setDoc, onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { uploadImage } from './cloudinaryService.js';

const USERS_COL = 'userDetail';

export const subscribeToUserProfile = (userId, callback) => {
  const ref = doc(db, USERS_COL, userId);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
};

/* ── Fetch a user profile once ── */
export const fetchUserProfile = async (userId) => {
  const snap = await getDoc(doc(db, USERS_COL, userId));
  return snap.exists() ? snap.data() : null;
};

/**
 * Save / update a user's profile.
 * @param {string}      userId
 * @param {Object}      data   — { name, phone }
 * @param {File|null}   imageFile — optional new profile picture
 */
export const saveUserProfile = async (userId, data, imageFile) => {
  let profileUrl = data.profile_url ?? null;

  if (imageFile) {
    profileUrl = await uploadImage(imageFile);
  }

  await setDoc(
    doc(db, USERS_COL, userId),
    { ...data, profile_url: profileUrl, userID: userId },
    { merge: true }
  );

  return profileUrl;
};