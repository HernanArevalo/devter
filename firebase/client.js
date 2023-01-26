import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged } from "firebase/auth"


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

const mapUserFromFirebaseAuth = ({user}) => {
  const { displayName, photoURL, uid } = user

  return {
    displayName: displayName,
    photoURL: photoURL,
    uid: uid
  }
}

export const onAuthStateChangedFn = (onChange) => {

  return onAuthStateChanged(user =>{

    const normalizedUser = mapUserFromFirebaseAuth(user)
    onChange(user)
  })

}



export const loginWithGithub = async() => {

    const provider = new GithubAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then( mapUserFromFirebaseAuth )
      .catch(err =>{
        console.error( err )
      })
}