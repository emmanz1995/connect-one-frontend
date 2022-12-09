import { UserService } from '../../services/userService';
import { userType } from '../types';
import { Dispatch } from 'redux';

export const getProfile = () => async(dispatch: Dispatch) => {
  try {
    dispatch({ type: userType.LOADING_USER })
    const response = await UserService.getProfile();
    dispatch({
      type: userType.GET_PROFILE_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const error = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString();
    console.log(error);
    dispatch({
      type: userType.GET_PROFILE_ERROR,
      payload: error
    });
  }
}

export const getUsers = () => async(dispatch: Dispatch) => {
  try {
    const response = await UserService.getAllUsers();
    dispatch({
      type: userType.GET_USERS_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const error = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString();
    console.log(error);
    dispatch({
      type: userType.GET_USERS_SUCCESS,
      payload: error
    });
  }
}