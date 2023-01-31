import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged as onAuthStateChangedFB } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAOd3ekmCaUX03BsPuIFYzR1qwxTnhT4P8",
  authDomain: "devter-8247b.firebaseapp.com",
  projectId: "devter-8247b",
  storageBucket: "devter-8247b.appspot.com",
  messagingSenderId: "452023406433",
  appId: "1:452023406433:web:cb7b55b53d4e062e087f20",
  measurementId: "G-1GNLMZ8H9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const mapUserFromFirebaseAuth = ( user ) => {

  const { displayName, photoURL, uid } = user

  return {
    displayName,
    photoURL,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {

  const authenticate = getAuth();

  return onAuthStateChangedFB(authenticate, user =>{

      const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
      onChange( normalizedUser )

  })

}



export const loginWithGithub = async() => {

    const provider = new GithubAuthProvider();
    const authenticate = getAuth();

    return signInWithPopup(authenticate, provider)

}