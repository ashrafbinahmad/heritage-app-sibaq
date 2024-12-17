import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, query, getDocs, orderBy, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyYvkD8w4kY3oZ3Wkk0C6iDjvlO41F_8I",
  authDomain: "heritage-app-sibaq.firebaseapp.com",
  projectId: "heritage-app-sibaq",
  storageBucket: "heritage-app-sibaq.firebasestorage.app",
  messagingSenderId: "744129071750",
  appId: "1:744129071750:web:5ca375fd606026e07b5f07",
  measurementId: "G-J9J9ZQSTHW",
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized: ", app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app, firebaseConfig.storageLink);

export async function saveData(collectionName, customIdOrEditId, savingData) {
  try {
    const blogShortRef = doc(db, collectionName, customIdOrEditId); // Custom ID matches the blog ID
    const dataToSave = {
      _id: customIdOrEditId,
      createdAt: Date.now().toString(),
      ...savingData,
    };
    await setDoc(blogShortRef, dataToSave); // Write to Firestore
    console.log(`Data saved with ID: ${customIdOrEditId}`);
  } catch (e) {
    console.error("Error saving data: ", e);
    throw e; // Propagate the error
  }
}

export async function deleteData(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log(`Document with ID: ${docId} has been deleted successfully.`);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
}

export async function getAllData(collectionName) {
  try {
    const dataCol = collection(db, collectionName);
    const dataQuery = query(dataCol, orderBy("createdAt", "desc"));
    const dataSnapshot = await getDocs(dataQuery);
    const dataList = dataSnapshot.docs.map((doc) => ({
      _id: doc.id, // Include document ID
      ...doc.data(), // Spread the rest of the document data
    }));
    console.log(collectionName, { dataList });
    return dataList;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
