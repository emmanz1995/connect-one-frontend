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
        case types.SUCCESS_LIKE_POST:
            return {
                posts: [
                    ...state.posts.map((post) => {
                        return post.id === payload.id ? { ...post, ...payload } : post
                    })
                ],
                loading: false
            }
        case types.ERROR_LIKE_POST:
            return {
                ...state,
                error: payload
            }
        case types.SUCCESS_DISLIKE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.map((post) => {
                        return post.id === payload.id ? { ...post, ...payload } : post
                    })
                ],
                loading: false
            }
            case types.ERROR_DISLIKE_POST:
                return {
                    error: payload
                }
        default: return state
    }
}

export default postReducer