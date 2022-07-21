import {initializeApp} from '@firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,query,where, orderBy, serverTimestamp
    ,getDoc
} from 'firebase/firestore'

import{
    getAuth,createUserWithEmailAndPassword
} from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdGREpmGWpCEwh6KoLnY9u1Tz4Yhrk_OU",
    authDomain: "projectmayhem-433e9.firebaseapp.com",
    projectId: "projectmayhem-433e9",
    storageBucket: "projectmayhem-433e9.appspot.com",
    messagingSenderId: "869477770662",
    appId: "1:869477770662:web:1dd4ebb7abf33e6945db67",
    measurementId: "G-1CCHZM12P2"
  };

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const colRef = collection(db,'books')

const q = query(colRef,orderBy('dateAdded'))

onSnapshot(q, (snapshot) => {
    let books = []
        snapshot.docs.forEach((doc)=>{
            books.push({...doc.data(),id:doc.id})
        })
    console.log(books);
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    dateAdded:serverTimestamp(),
  })
  .then(() => {
    addBookForm.reset()
  })
})


// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})


const docRef = doc(db, 'books', 'DlibD2M0c67g2RlKdSUD')

// getDoc(docRef)
//   .then(doc => {
//     console.log(doc.data(), doc.id)
//   })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})