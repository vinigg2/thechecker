import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { browserHistory } from 'react-router';


export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOG_IN_SUCCESS:
            return {
                session: !!sessionStorage.token,
                me: action.payload.user
            }
        case types.LOG_OUT:
            sessionStorage.removeItem('token');
            return {
                session: false,
                me: {}
            }
        default:
            return state;
    }
}