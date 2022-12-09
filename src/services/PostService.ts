import axios from 'axios';
import { PostT } from '../utils/types';
import _ from 'lodash';
import authHeader from '../utils/authHeaderUtil';

const getFeedPosts = async() => {
  const response = await axios.get('/api/post/getposts', {
    headers: authHeader()
  })
  return response.data;
}

const getMyPosts = async() => {
  const response = await axios.get('/api/post/getMyPosts', {
    headers: authHeader()
  })
  return response.data;
}

const onCreatePost = async(formData: PostT) => {
  const response = await axios.post('/api/post', formData, {
    headers: authHeader()
  })
  return response.data;
}

const onLikePost = async(id: string) => {
  const response = await axios.put(`/api/post/like/${id}`, _, {
    headers: authHeader()
  })
  return response.data;
}

const onDislikePost = async(id: string) => {
  const response = await axios.put(`/api/post/dislike/${id}`, _, {
    headers: authHeader()
  })
  return response.data;
}

const onDeletePost = async(id: string) => {
  const response = await axios.delete(`/api/post/${id}`, {
    headers: authHeader()
  })
  return response.data;
}

export const PostService = {
  getFeedPosts,
  onCreatePost,
  onLikePost,
  onDislikePost,
  getMyPosts,
  onDeletePost
}