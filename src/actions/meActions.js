import * as types from './actionTypes';
import meApi from '../api/meApi';

export function loadMeSuccess(me) {
  return {type: types.LOAD_ME_SUCCESS, me};
}

export function loadMe() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return meApi.getMe().then(me => {
      dispatch(loadMeSuccess(me));
    }).catch(error => {
      throw(error);
    });
  };
}
