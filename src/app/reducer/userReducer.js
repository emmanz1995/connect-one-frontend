import * as types from '../types'

const initialState = {
    users: [],
    loading: false
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case types.SUCCESS_FOLLOW_USER:
            return {
                users: [
                    ...state.users.map((user) => user.id === payload.id ? { ...user, ...payload } : user)
                ],
                loading: false
            }
        case types.SUCCESS_UNFOLLOW_USER:
            return {
                users: [
                    ...state.users.map((user) => user.id === payload.id ? { ...user, ...payload } : user)
                ],
                loading: false
            }
        case types.ERROR_FOLLOW_USER:
            return {
                error: payload,
                loading: false
            }
        case types.ERROR_UNFOLLOW_USER:
            return {
                error: payload,
                loading: false
            }
        default: return state
    }
}

export default userReducer