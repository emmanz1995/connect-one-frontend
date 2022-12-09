import { userType } from '../types';
import { TUser } from '../../utils/types';

interface IUser {
  payload: TUser[];
  type: string;
}

const initialState = {
  currentUser: {},
  users: [],
  loading: false,
  error: ''
}

const userReducer = (state = initialState, action: IUser) => {
  const { payload, type } = action;
  switch(type) {
    case userType.LOADING_USER:
      return {
        loading: true,
        users: [],
        currentUser: {},
        error: ''
      }
    case userType.GET_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        loading: false,
        error: ''
      }
    case userType.GET_PROFILE_ERROR:
      return {
        currentUser: {},
        error: payload,
        loading: false
      }
    case userType.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: ''
      }
    case userType.GET_USERS_ERROR:
      return {
        users: [],
        error: payload,
        loading: false
      }
    default: return state;
  }
}

export default userReducer;