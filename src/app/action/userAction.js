import * as types from '../types'
import { UserService } from '../../service/user'

export const followUser = (id) => async (dispatch) => {
    try {
        const response = await UserService.onFollowUser(id)
        console.log(id)
        dispatch({
            type: types.SUCCESS_FOLLOW_USER,
            payload: response
        })
    } catch(err) {
        const error = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
        console.log(error)
        dispatch({
            type: types.ERROR_FOLLOW_USER,
            payload: error
        })
    }
}

export const unFollowUser = (id) => async (dispatch) => {
    try {
        const response = await UserService.onUnFollowUser(id)
        dispatch({
            type: types.SUCCESS_UNFOLLOW_USER,
            payload: response
        })
    } catch(err) {
        const error = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
        console.log(error)
        dispatch({
            type: types.ERROR_UNFOLLOW_USER,
            payload: error
        })
    }
}