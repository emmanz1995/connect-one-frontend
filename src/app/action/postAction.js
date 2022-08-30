import * as types from '../types'
import { PostService } from '../../service/post'

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: types.REQUEST_POST })
        const response = await PostService.getPosts()
        dispatch({
            type: types.SUCCESS_GET_POSTS,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({ type: types.ERROR_GET_POSTS, payload: errorMessage })
    }
}

export const feedPosts = () => async (dispatch) => {
    try {
        dispatch({ type: types.REQUEST_POST })
        const response = await PostService.getFeedPosts()
        dispatch({
            type: types.SUCCESS_GET_FEED_POSTS,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_GET_FEED_POSTS,
            payload: errorMessage
        })
    }
}

export const createPosts = (formData) => async (dispatch) => {
    try {
        // dispatch({ type: types.REQUEST_POST })
        const response = await PostService.onCreatePost(formData)
        dispatch({
            type: types.SUCCESS_CREATE_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({ type: types.ERROR_CREATE_POST, payload: errorMessage })
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const response = await PostService.onLikePost(id)
        dispatch({
            type: types.SUCCESS_LIKE_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_LIKE_POST,
            payload: errorMessage
        })
    }
}

export const dislikePost = (id) => async (dispatch) => {
    try {
        const response = await PostService.onDislikePost(id)
        dispatch({
            type: types.SUCCESS_DISLIKE_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_DISLIKE_POST,
            payload: errorMessage
        })
    }
}

export const bookmarkPost = (id) => async (dispatch) => {
    try {
        const response = await PostService.onBookmarkPost(id)
        dispatch({
            type: types.SUCCESS_BOOKMARK_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_BOOKMARK_POST,
            payload: errorMessage
        })
    }
}

export const unBookmarkPost = (id) => async (dispatch) => {
    try {
        const response = await PostService.onUnBookmarkPost(id)
        dispatch({
            type: types.SUCCESS_UNBOOKMARK_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_UNBOOKMARK_POST,
            payload: errorMessage
        })
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const response = await PostService.onDeletePost(id)
        dispatch({
            type: types.SUCCESS_DELETE_POST,
            payload: response
        })
    } catch(err) {
        const errorMessage = (err?.response && err?.response?.data && err?.response?.data?.msg) || err || err?.msg.toString()
        console.log(errorMessage)
        dispatch({
            type: types.ERROR_DELETE_POST,
            payload: errorMessage
        })
    }
}
