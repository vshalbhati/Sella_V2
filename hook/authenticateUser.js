// action types
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

// action creators
export const authenticateUser = (phoneNumber) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE_USER });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmationResult) => {
        dispatch({ type: AUTHENTICATION_SUCCESS, confirmationResult });
      })
      .catch((error) => {
        dispatch({ type: AUTHENTICATION_ERROR, error });
      });
  };
};
