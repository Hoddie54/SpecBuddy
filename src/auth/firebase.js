import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import {
  getFirestore,
  query,
  getDocs,
  collection,
  doc,
  setDoc,
  where,
} from "firebase/firestore"
import { getDocument } from "../firestore/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async (setUser) => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    try {
      const doc = await getDocument("users", user.uid)
      if (!doc) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          ratings: [],
        })
      }
    } catch (e) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        ratings: [],
      })
    }
    setUser(user)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const logInWithEmailAndPassword = async (email, password, setUser) => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    const res = await signInWithEmailAndPassword(auth, email, password)
    setUser(res.user)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const registerWithEmailAndPassword = async (name, email, password, setUser) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
    setUser(user)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const logout = async (setUser) => {
  await signOut(auth)
  setUser(null)
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}
