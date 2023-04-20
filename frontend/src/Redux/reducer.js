import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from './actionTypes';

export const authInitalState = {
  loading: false,
  token: JSON.parse(localStorage.getItem('token')) || '',
  error: false,
};

export  const authReducer = (state = authInitalState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('token', JSON.stringify(payload.token));
      return {
        ...state,
        loading: false,
        error: false,
        token: payload.token,
      };
    }

    // logout

    case AUTH_LOGOUT: {
      localStorage.removeItem('token');
      // localStorage.removeItem('userInfo');

      return {
        ...state,
        loading: false,
        error: false,
        token: '',
        name: '',
      };
    }
    default: {
      return state;
    }
  }
};
