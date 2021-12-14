import { types } from '../types/types';

export const setError = (err) => {
  return {
    type: types.uiSetError,
    payload: {
      msgError: err,
    },
  };
};

export const removeError = () => {
  return {
    type: types.uiRemoveError,
    payload: null,
  };
};

export const startLoading = () => {
  return {
    type: types.uiStartLoading,
  };
};

export const finishLoading = () => {
  return {
    type: types.uiFinishLoading,
  };
};
