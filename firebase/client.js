import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged as onAuthStateChangedFB } from "firebase/auth"
import { getFirestore, collection, addDoc, Timestamp, getDocs  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOd3ekmCaUX03BsPuIFYzR1qwxTnhT4P8",
  authDomain: "devter-8247b.firebaseapp.com",
  projectId: "devter-8247b",
  storageBucket: "devter-8247b.appspot.com",
  messagingSenderId: "452023406433",
  appId: "1:452023406433:web:cb7b55b53d4e062e087f20",
  measurementId: "G-1GNLMZ8H9K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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

export const addDevit = async({avatar,content,userId,userName})  => {

  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export const fetchLatestDevits = async()=>{

  const devits = []
  
  await getDocs(collection(db, "devits"))
    .then( snapshot =>{
        snapshot.forEach(doc=>{
          
          const data = doc.data()
          const id = doc.id
          const {createdAt} = data
          
          const date = new Date(createdAt.seconds * 1000)
          const normalizeCreatedAt = new Intl.DateTimeFormat('es-ES').format(date).toString()

          devits.push({
            ...data,
            id,
            createdAt: normalizeCreatedAt
          })
        })
    })
  return devits
    
}
