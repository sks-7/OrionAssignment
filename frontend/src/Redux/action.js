import axios from 'axios';
import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from './actionTypes';

export const loginAPI = (creds) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    let response = await axios.post('http://localhost:8080/user/login', creds);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({ type: AUTH_LOGIN_ERROR });
  }
};

// logout

export const Signout = () => ({ type: AUTH_LOGOUT });
