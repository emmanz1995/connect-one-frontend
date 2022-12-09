import { authTypes } from '../types';

const user = JSON.parse(localStorage.getItem('user') as any);

type actionType = {
    payload: any;
    type: string;
}

const initialState = user
  ? { user: user, isAuthenticated: true }
  : { user: null, isAuthenticated: false }

const authReducer = (state = initialState, action: actionType) => {
    const { payload, type } = action;
    switch(type) {
        case authTypes.AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: true
            }
        case authTypes.AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: payload
            }
        case authTypes.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default: return state;
    }
}

export default authReducer;