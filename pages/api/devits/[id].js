/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase/client';
import { doc, getDoc, getFirestore } from 'firebase/firestore';




export default async(req,res) => {
    const { query } = req
    const { id } = query

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "devits", id);
    getDoc(docRef)
    .then(doc=>{

        const data = doc.data()
        const id = doc.id
        const {createdAt} = data
    
        res.json({
          ...data,
          id,
          createdAt: +createdAt.toDate()
        })


    }).catch(()=>{
        res.status(404).end()
    })

}