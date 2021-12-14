import { googleAuthProvider } from '../firebase/firebase-config';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
  const auth = getAuth();

  return (dispatch) => {

    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        dispatch(finishLoading());
        Swal.fire('Error!', errorMessage, 'error');
      });
      
  };
};

export const startRegisterWithEmailPasswordName = (email, pass, name) => {
  const auth = getAuth();

  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        try {
          await updateProfile(auth.currentUser, { displayName: name });
        } catch (error) {
          console.log(error);
        }
        console.log(user);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorMessage, errorCode });
        Swal.fire('Error!', errorMessage, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  const auth = getAuth();
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;

      // console.log(user);
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  const auth = getAuth();

  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());
    //clean Notes
    dispatch(noteLogout());
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
