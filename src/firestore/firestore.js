import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  increment,
} from "firebase/firestore"
import { db } from "../auth/firebase"

export const getCollection = async (coll) => {
  const res = []
  const querySnapshot = await getDocs(collection(db, coll))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    console.log(doc.id, " => ", data)
    res.push(data)
  })
  return res
}

export const getDocument = async (coll, document) => {
  const docRef = doc(db, coll, document)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id }
  } else {
    // docSnap.data() will be undefined in this case
    console.error("Error getting data")
    throw Error("NO such document ", coll, doc)
  }
}

export const updateRating = async (
  user_uid,
  subject,
  exam_board,
  spec_id,
  new_rating
) => {
  const docRef = doc(db, "users", user_uid)

  // Atomically add a new region to the "regions" array field.
  await updateDoc(docRef, {
    ["ratings" +
    "." +
    exam_board +
    "-" +
    subject +
    "-" +
    spec_id.replaceAll(".", "-")]: new_rating,
  })
}

export const updateDocument = async (coll, d, new_data) => {
  const docRef = doc(db, coll, d)
  const res = await updateDoc(docRef, new_data)
  return res
}

//Note: Rating is 1 or -1
export const updateUserRating = async (
  exam_board,
  subject,
  topic_id,
  subtopic_id,
  specpoint_id,
  additional_info,
  positive
) => {
  const docId = `${exam_board}-${subject}-${topic_id}-${subtopic_id}-${specpoint_id}-${additional_info}`
  const docRef = doc(db, "user_ratings", docId)
  const objectLabel = positive ? "ups" : "downs"
  try {
    const res = await updateDoc(docRef, {
      [objectLabel]: increment(1),
    })
    return res
  } catch (e) {
    if (e.toString().includes("No document to update")) {
      await setDoc(docRef, {
        [objectLabel]: 1,
      })
    }
  }
}

export const addNewFeedback = async (name, email, school, feedback) => {
  const res = await addDoc(collection(db, "feedback"), {
    name: name,
    email: email,
    feedback: feedback,
    school: school,
    timestamp: serverTimestamp(),
  })
  return res
}

// export const getCollectionFromFirestore = (coll) => {
//   return new Promise((resolve, reject) => {
//     collection(db, coll)
//       .get()
//       .then((querySnapshot) => {
//         const data = []
//         querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
//         console.log("Reads :", querySnapshot.size)
//         resolve(data)
//       })
//       .catch((err) => {
//         console.log("Error getting all data (all of collection)", err)
//         reject(err)
//       })
//   })
// }

// export const getDataFromFirestore = (coll, doc) => {
//   return new Promise((resolve, reject) => {
//     collection(db, coll)
//       .doc(doc)
//       .get()
//       .then((res) => {
//         console.log("Data read")
//         resolve({ ...res.data(), id: res.id })
//       })
//       .catch((err) => {
//         console.log("Error getting data")
//         reject(err)
//       })
//   })
// }
