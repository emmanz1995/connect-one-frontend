import * as types from '../types'

const initialState = {
    posts: [],
    message: '',
    loading: false
}


const postReducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log(state)
    switch(type) {
        case types.REQUEST_POST:
            return {
                ...state,
                loading: true
            }
        case types.SUCCESS_GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case types.ERROR_GET_POSTS:
            return {
                ...state,
                posts: [],
                loading: false,
                error: payload
            }
        case types.SUCCESS_CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case types.ERROR_CREATE_POST:
            return {
                error: payload
            }
        default: return state
    }
}

export default postReducer