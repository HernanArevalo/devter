import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged as onAuthStateChangedFB } from "firebase/auth"
import { getFirestore, collection, addDoc, Timestamp, getDocs, orderBy, query, onSnapshot  } from "firebase/firestore";


export const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)


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


export const addDevit = async( { avatar,content,userId,userName } )  => {

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
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export const mapDevitFromFirebaseToDevitObject = (doc) => {

  const data = doc.data()
  const id = doc.id
  const {createdAt} = data

  return{
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

export const listenLatestDevits = (callback) => {
  
  onSnapshot(query(collection(db, "devits"), orderBy("createdAt", "desc")), 
  (querySnapshot) => {
    
    const newsDevits = [];
    querySnapshot.forEach((doc) => {
      newsDevits.push(mapDevitFromFirebaseToDevitObject(doc))
    })

    callback(newsDevits)
  })

}

// export const fetchLatestDevits = async()=>{

//   const devits = []

//   await getDocs(query(collection(db, "devits"), orderBy("createdAt", "desc")))
//     .then((docs) => {

//       return docs.forEach((doc) => {
//         devits.push( mapDevitFromFirebaseToDevitObject(doc) )
//       })
//     })
//     listenLatestDevits('dasd')
//     return devits
    
// }

export const uploadImages = (file) => {

  const storage = getStorage()
  const imagesRef = ref(storage, `images/${file.name}`);
  const task = uploadBytes(imagesRef, file)
  
  return task
}