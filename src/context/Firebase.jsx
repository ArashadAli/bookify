import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { useState,useEffect } from "react";
import {getFirestore,setDoc, onSnapshot,doc, addDoc, collection,getDocs,getDoc,updateDoc} from 'firebase/firestore'
const FirebaseContext = createContext(null)
const firebaseConfig = {
  apiKey: "AIzaSyD0TpDQ7e735w-GfX0p3q5LXx6J_N0MCQY",
  authDomain: "bookify-694ec.firebaseapp.com",
  projectId: "bookify-694ec",
  storageBucket: "bookify-694ec.firebasestorage.app",
  messagingSenderId: "367793579578",
  appId: "1:367793579578:web:de330195699f3bc378b703"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const useFirebase = () => useContext(FirebaseContext)

const firestore = getFirestore(FirebaseApp)

// CREATE FIREBASE AUTH INSTANCE
const firebaseAuth = getAuth(FirebaseApp)
export const FirebaseProvider = (props) => {
    const SignupUserWithEmailAndPassword = async(email,password) => {
        try {
           const userCredentials = await createUserWithEmailAndPassword(firebaseAuth,email,password)

           // WAIT KARO JAB TAK USER APNE EMAIL KO VERIFY NAHI KARWATA HAI
           await sendEmailVerification(userCredentials.user)
           alert('verification link is sent to your email open it and verify it..')
           return {success:true,user:userCredentials.user}
        } catch (error) {
            return {success:false,error}
        }
    }
    // SET THE CURRENT LOGGED IN USER DETAILS
const [currentLoggendInUser,setcurrentLoggendInUser] = useState(null)


    const signinUserWithEmailAndPassword = async(email,password) => {
       try {
        const userCredentials = await signInWithEmailAndPassword(firebaseAuth,email,password)
        if(!userCredentials.user.emailVerified){
            // await sendEmailVerification(userCredentials.user);
             await signOut(firebaseAuth);
             alert('OPEN YOUR EMAIL AND VERIFIED')
             return {success:false,error:"Email is not verified"}
        }
        setcurrentLoggendInUser(userCredentials.user)
        console.log("userCredentials from signin : ",userCredentials)
        return {success:true,user:userCredentials.user}
       } catch (error) {
        return {success:false,error}
       }
    }
    const logoutUser = async() => {
        return await signOut(firebaseAuth)
    }
    // CHECK WHO IS CURRENTLY LOGIN OR SIGNIN
    const [loggedInUser,setloggedInUser] = useState(null)
    useEffect(() =>{
        onAuthStateChanged(firebaseAuth,(user) => {
            // console.log("loggedin user onAuth state change: ",user)
            if(user){
                if(user.emailVerified || user.providerData[0].providerId === "google.com"){
                    setloggedInUser(user)
                }
                else{
                    setloggedInUser(null)
                }
            }
            else{
                setloggedInUser(null)
            }
        })
    },[])
    const isLoggedIn = loggedInUser ?  true : false;
    // console.log("firebase component loggedin user : ",isLoggedIn)
    const googleProvider = new GoogleAuthProvider()
    const loginWithGoogle = async() => {
      try {
        const result =  await signInWithPopup(firebaseAuth,googleProvider)
        const user = result.user
        setcurrentLoggendInUser(user)
        console.log("logged in user with google : ",user)
        // return {success:true,currentUser:user}
      } catch (error) {
        console.log("Error while login with google : ",error)
      }
    }

    const uploadPreset = import.meta.env.VITE_CLOUDINARY_NAME;
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URI;

    const uploadImagetoCloudinary = async (file) => {
          const formData = new FormData();
          formData.append("file", file);
           formData.append("upload_preset", uploadPreset); 

         const res = await fetch(
                cloudinaryUrl,
                {
                method: "POST",
                body: formData,
                }
       );
        const data = await res.json();
        console.log("Uploaded Image URL:", data.secure_url);
        return data.secure_url;
    }
    const [userProfile,setUserProfile] = useState(null)
    const adduserDetail = async(name,phone,profilePic) => {
        const url = await uploadImagetoCloudinary(profilePic)
       try {
        const res = await setDoc(doc(firestore,"userDetail",loggedInUser.uid), {
        name,
        phone,
        profile_url:url,
        userID:loggedInUser.uid
     });
        console.log("profile uploaded : ",res)
       } catch (error) {
        console.log("error in firebasecontext : ",error)
       }
    }
    const addNewBook = async (bookDetails) => {
        const bookURL = await uploadImagetoCloudinary(bookDetails.bookImage)
        //console.log("book url : ",bookURL)
        const {bookImage,...filterDetail} = bookDetails
        try {
            const uploadedBookRef = await addDoc(collection(firestore,"books"),{
                ...filterDetail,
                bookURL,
                userID:loggedInUser.uid,
                likes:0,
                //ratings:{totalRating:"",totalRatedUser:""},
                bookLikedUser:{}
            })
            //console.log("uploaded book : ",uploadedBookRef.id)

            // here i am adding the same book to the loggedinuser for future use

            const userBookRef = doc(
                firestore,
                "userDetail",
                loggedInUser.uid,
                "books",
                uploadedBookRef.id
            )
            await setDoc(userBookRef,{
                ...filterDetail,
                bookURL,
                uploadedBookRefID:uploadedBookRef.id
            })
        } catch (error) {
            console.log("error while uploading the books : ",error)
        }
    }
    const listAllBookRealtime = (callback) => {
  const booksRef = collection(firestore, "books");
  return onSnapshot(booksRef, (snapshot) => {
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(books);
  });
};

    const listUserBook = async() => {
        try {
            const bookRef = collection(
                firestore,
                "userDetail",
                loggedInUser.uid,
                "books"
            )
            const snapshot = await getDocs(bookRef)
            const books = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }))
            return books
        } catch (error) {
            console.log("error while fetching the user book : ",error)
        }
    }
useEffect(() => {
    if(isLoggedIn && loggedInUser){
        const userDocRef = doc(firestore,"userDetail",loggedInUser.uid);

        const unsubscribe = onSnapshot(userDocRef,(snapshot)=>{
            if(snapshot.exists()){
                // console.log("Realtime profile update: ",snapshot.data());
                setUserProfile(snapshot.data());
            } else {
                // console.log("No profile found for user");
                setUserProfile(null);
            }
        });

        return () => unsubscribe(); // cleanup on unmount
    }
}, [isLoggedIn, loggedInUser]);

// HERE I AM DOING THE LIKE THINGS

    const likesHandle = async(bookId) => {
        try {
            const bookRef = doc(firestore,"books",bookId)
            const bookSnap = await getDoc(bookRef)
            //console.log("book snap : ",bookSnap)
            if(bookSnap.exists()){
                const bookdata = bookSnap.data()
                //console.log("bookdata : ",bookdata)
                let currentLike = bookdata.likes ? bookdata.likes : 0
                const likedUser = bookdata.bookLikedUser
                if(likedUser[loggedInUser.uid]){
                    delete likedUser[loggedInUser.uid]
                    currentLike = Math.max(currentLike-1,0)
                }
                else{
                    likedUser[loggedInUser.uid] = true
                    currentLike = currentLike + 1
                }
                await updateDoc(bookRef,{
                    bookLikedUser:likedUser,
                    likes:currentLike
                })
                // console.log("liked updated successfully!")
                // console.log("bookdata : ",bookdata)
            }
            else{
                console.log("book not found")
            }
        } catch (error) {
            console.log("Internal error : ",error)
        }
    }

    // HERE I AM ADDING THE BOOK INTO THE USER CART SECTION
    const addToCart = async (bookId) => {
        console.log("bookid : ",bookId)
        const bookRef = doc(firestore,"books",bookId)
        const bookSnap = await getDoc(bookRef)
        if(bookSnap.exists()){
            const bookDetail = bookSnap.data()
            const cartCollectionRef = collection(
                firestore,
                "userDetail",
                loggedInUser.uid,
                "cart"
            )
            const bookAlreadyInCart = await getDocs(cartCollectionRef)
            const isAvailable = bookAlreadyInCart.docs.some((doc) => doc.data().bookName == bookDetail.bookName)
            if(isAvailable){
                alert("Book is already in your cart!")
                return
            }
            const addedBook = await addDoc(cartCollectionRef,{
                ...bookDetail,
                date : Date.now(),
                bookID : bookId
            })
            console.log("book added to current user : ",addedBook)
        }
    }
    const fetchCartBook = async () => {
        try {
            const cartCollectionRef = collection(
                firestore,
                "userDetail",
                loggedInUser.uid,
                "cart"
            )
            const snapshot = await getDocs(cartCollectionRef)
            const cartBooks = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))
            console.log("fetched books : ",cartBooks)
            return cartBooks
        } catch (error) {
            console.log("error while fetching the cart : ",error)
            return []
        }
    }
    const returnBookById = async(bookId) => {
        try {
            const bookRef = doc(firestore,"books",bookId)
            const bookSnap = await getDoc(bookRef)
            // console.log("liked book detail : ",bookSnap.data());
            if(bookSnap.exists()){
                const book = await bookSnap.data()
                return book
            }
        } catch (error) {
            console.log("you didn't upload any book : ",error)
        }
    }
    return (
        <FirebaseContext.Provider
        value={{
            SignupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            logoutUser,
            isLoggedIn,
            loginWithGoogle,
            currentLoggendInUser,
            loggedInUser,
            adduserDetail,
            userProfile,
            addNewBook,
            listAllBookRealtime,
            listUserBook,
            addToCart,
            fetchCartBook,
            likesHandle,
            returnBookById
        }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
