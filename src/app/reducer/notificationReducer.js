import * as types from '../types'

const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SUCCESS_NOTIFY:
            return action.message
        case types.REMOVE_NOTIFY:
            return action.message
        default: return state
    }
}

export const notificationAction = (message, time) => async (dispatch) => {
    dispatch({
        type: types.SUCCESS_NOTIFY,
        message
    })

    setTimeout(() => {
        dispatch({
            type: types.REMOVE_NOTIFY,
            message: null
        })
    }, time * 1000)
}

export default notificationReducer