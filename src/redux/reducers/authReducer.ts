import { authTypes } from '../types';

const user = JSON.parse(localStorage.getItem('user') as any);

type actionType = {
    payload: any;
    type: string;
}

const initialState = user
  ? { user: user, isAuthenticated: true, loading: false }
  : { user: null, isAuthenticated: false, loading: false }

const authReducer = (state = initialState, action: actionType) => {
    const { payload, type } = action;
    switch(type) {
        case authTypes.AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: true, 
                loading: false
            }
        case authTypes.AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: payload,
                loading: false
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