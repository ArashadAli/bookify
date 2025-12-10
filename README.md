📘 Bookify – Old Book Buying & Selling Platform

A React + Firebase web application where users can buy and sell old books easily.
Users can list their used books for sale, browse available books, and purchase them.

🚀 Features
👤 User Features

Create account & login

Add/Sell old books

View available books

Buy books

View book details

Real-time data updates (Firebase)

🛠 Admin/Owner Features (optional)

Verify book listings

Manage users

Remove inappropriate book posts

🔥 Technical Features

Firebase Authentication

Firestore Database

Firebase Storage (for images)

Responsive React UI

Protected Routes

Realtime data fetching

🧰 Tech Stack
Layer	Technology
Frontend	React, Vite, Tailwind CSS
Backend	Firebase
Database	Firebase Firestore
Storage	Firebase Cloud Storage
Deployment	Vercel / Netlify (for frontend)
📁 Project Folder Structure
bookify/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── firebase/ (firebase config here)
│   ├── App.jsx
│   └── main.jsx
│── .gitignore
│── package.json
│── README.md
│── vite.config.js

🛠 Installation & Setup Guide (Complete Beginner Friendly)

Follow these steps to run the project on your system.

1️⃣ Clone the Repository
git clone https://github.com/ArashadAli/bookify.git
cd bookify

2️⃣ Install Dependencies
npm install

🔥 Firebase Setup Guide

Follow these steps carefully.

3️⃣ Create Firebase Project

Visit https://console.firebase.google.com

Click Add Project

Enter project name → Bookify

Create project

4️⃣ Enable Firebase Authentication

Go to Build → Authentication → Get Started

Enable Email/Password sign-in

5️⃣ Create Firestore Database

Go to Build → Firestore Database

Click Create Database

Choose Start in test mode (for development)

6️⃣ Enable Firebase Storage

Go to Build → Storage

Click Create Bucket

Used to store book images.

7️⃣ Get Firebase SDK Config

Go to:

Project Settings → Your Apps → Web App

Copy this:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

8️⃣ Create .env file in root folder
VITE_FIREBASE_API_KEY = YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN = YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID = YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET = YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID = YOUR_SENDER_ID
VITE_FIREBASE_APP_ID = YOUR_APP_ID

9️⃣ Setup Firebase Config in React

Inside src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

▶️ Run the Project Locally
npm run dev


Your app will start at:

http://localhost:5173


📌 Future Improvements

Chat between Buyer & Seller

Payment Gateway

Ratings / Reviews

Admin Panel

Recommended Books

🤝 Contributing

Pull requests are welcome.
For significant changes, please open an issue first.