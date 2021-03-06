import Swal from 'sweetalert2';
import { collection, addDoc, getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
// react-journal
export const startNewNote = () => {
  const db = getFirestore();
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    //`${uid}/journal/notes`

    const docRef = await addDoc(collection(db, `${uid}/journal/notes`), {
      ...newNote,
    });

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
    console.log(docRef.id);
  };
};

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note,
    },
  };
};

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const db = getFirestore();

    if (!note.url) {
      delete note.url
    }

    const noteToFS = { ...note };
    delete noteToFS.id;

    const docRef = doc(db, `${uid}/journal/notes/${note.id}`);

    await updateDoc(docRef, noteToFS);
    dispatch(refreshNote(note.id, note));
    Swal.fire('Saved', note.title, 'success');
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id, note
  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {

    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Upladading',
      text: 'Please Wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote))
    Swal.close();
  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {

    const db = getFirestore();
    const uid = getState().auth.uid;

    await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))

    dispatch(deleteNote(id));

  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

export const noteLogout = () => ({

  type: types.notesLogoutCleaning,

})
// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture: imageUrl,
//   });
// }
