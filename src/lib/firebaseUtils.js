// db.js
import { firestore } from "./firebase";

// Example of adding data to Firestore
const addData = async (collection, data) => {
  try {
    const docRef = await firestore.collection(collection).add(data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Example of reading data from Firestore
const fetchData = async (collection) => {
  try {
    const snapshot = await firestore.collection(collection).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Example of updating data in Firestore
const updateData = async (collection, id, newData) => {
  try {
    await firestore.collection(collection).doc(id).update(newData);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Example of deleting data from Firestore
const deleteData = async (collection, id) => {
  try {
    await firestore.collection(collection).doc(id).delete();
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export { addData, fetchData, updateData, deleteData };
