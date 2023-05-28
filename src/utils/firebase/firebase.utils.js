// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBHmMCmOGXzFp1H2scBB0m37QnIyc-eNM",
  authDomain: "cown-clothing-db-b1418.firebaseapp.com",
  projectId: "cown-clothing-db-b1418",
  storageBucket: "cown-clothing-db-b1418.appspot.com",
  messagingSenderId: "898327971921",
  appId: "1:898327971921:web:639c9e6b2ff70f3cb41070",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// set provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Authenticate user and store credentials in firebase cloud database
export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); //Getting the instance of the doc(). Takes 3 arguments, database, collection, item to set.
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef); //getting the actual content for the user information.
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create / set the document with the data from the userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists, return user data (userDocRef)
  return userDocRef;
};
