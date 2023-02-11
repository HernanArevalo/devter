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
        res.json(doc.data())

    }).catch(()=>{
        res.status(404).end()
    })

}