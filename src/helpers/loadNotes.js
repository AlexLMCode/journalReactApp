import { collection, getDocs, getFirestore } from '@firebase/firestore';

export const loadNotes = async (uid) => {
  const db = getFirestore();

  const querySnapshot = await getDocs(collection(db, `${uid}/journal/notes`));
  const notes = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    notes.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return notes;
};
