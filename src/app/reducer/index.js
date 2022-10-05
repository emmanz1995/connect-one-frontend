import { combineReducers } from 'redux'
import postReducer from './postReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
    posts: postReducer,
    notification: notificationReducer
})