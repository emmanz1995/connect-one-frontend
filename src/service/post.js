import axios from 'axios'
import AuthHeaderUtil from '../util/authHeaderUtil'

const getPosts = async() => {
    const response = await axios.get('/api/post')
    return response.data
}
const onCreatePost = async(formData) => {
    const response = await axios.post('/api/post', formData, {
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onLikePost = async(id, _) => {
    const response = await axios.put(`/api/post/like/${id}`, _,{
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onDislikePost = async(id, _) => {
    const response = await axios.put(`/api/post/dislike/${id}`, _, {
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onCommentPost = async(id, text) => {
    const response = await axios.put(`/api/post/comment/${id}`, text,{
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onBookmarkPost = async(id, _) => {
    const response = await axios.put(`/api/user/bookmark/${id}`, _,{
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onUnBookmarkPost = async(id, _) => {
    const response = await axios.put(`/api/user/unbookmark/${id}`, _,{
        headers: AuthHeaderUtil()
    })
    return response.data
}
const onDeletePost = async(id) => {
    const response = await axios.delete('/api/post/' + id, {
        headers: AuthHeaderUtil()
    })
    return response.data
}


export const PostService = {
    getPosts,
    onCreatePost,
    onLikePost,
    onDislikePost,
    onCommentPost,
    onBookmarkPost,
    onUnBookmarkPost,
    onDeletePost
}