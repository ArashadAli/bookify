import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/firebase.js';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);   // Firebase user object
  const [authLoading, setLoading] = useState(true);   // initial auth check

  /* ── Listen to auth state changes ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isGoogle = firebaseUser.providerData?.[0]?.providerId === 'google.com';
        if (firebaseUser.emailVerified || isGoogle) {
          setUser(firebaseUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  /* ── Sign Up ── */
  const signUp = useCallback(async (email, password) => {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(creds.user);
    return creds.user;
  }, []);

  /* ── Sign In ── */
  const signIn = useCallback(async (email, password) => {
    const creds = await signInWithEmailAndPassword(auth, email, password);
    if (!creds.user.emailVerified) {
      await signOut(auth);
      throw new Error('Email not verified. Please check your inbox.');
    }
    return creds.user;
  }, []);

  /* ── Google Sign In ── */
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result   = await signInWithPopup(auth, provider);
    return result.user;
  }, []);

  /* ── Logout ── */
  const logout = useCallback(async () => {
    await signOut(auth);
    toast.success('You have been logged out.');
  }, []);

  const isLoggedIn = Boolean(user);

  const value = {
    user,
    isLoggedIn,
    authLoading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};