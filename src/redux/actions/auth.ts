import { AuthService } from '../../services/AuthService';
import { ILogin } from '../../utils/types';
import { authTypes } from '../types';
import { Dispatch } from 'redux';

export const login = (formData: ILogin, navigate: any) => async (dispatch: Dispatch<any>) => {
  try {
    const response = await AuthService.onLogin(formData);
    navigate('/feed');
    dispatch({
      type: authTypes.AUTHENTICATE_USER_SUCCESS,
      payload: response
    })
    console.log(response);
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err.msg || err.toString();
    console.log(message);
    dispatch({
      type: authTypes.AUTHENTICATE_USER_ERROR,
      payload: message
    })
  }
}

export const logout = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: authTypes.LOGOUT });
  AuthService.onLogout();
}