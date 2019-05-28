import * as types from './actionTypes';
import sessionApi from '../api/SessionApi';

export function loginSuccess(payload) {
  return {
    type: types.LOG_IN_SUCCESS,
    payload: payload
  }
}

export function loginLogout() {
  return {
    type: 'LOG_OUT'
  }
}

export function logInUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (response && response.status === 200) {
        sessionStorage.setItem('token', response.user.password);
        dispatch(loginSuccess(response));
      }
    }).catch(error => {
      throw (error);
    });
  };
}

export function signUp(credentials) {
  return function (dispatch) {
    return sessionApi.signup(credentials).then(response => {
      sessionStorage.setItem('token', response.user.password);
      dispatch(loginSuccess(response));
    }).catch(error => {
      throw (error);
    });
  };
}

export function getMe(token) {
  return function (dispatch) {
    return sessionApi.me({ token }).then(response => {
      sessionStorage.setItem('token', response.user.password);
      dispatch(loginSuccess(response));
    }).catch(error => {
      throw (error);
    });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(loginLogout());
  }
}