import { Dispatch } from 'redux';
import { PostService } from '../../services/PostService';
import { postTypes } from '../types';
import { PostT } from '../../utils/types';

export const getPostFeed = () => async (dispatch: Dispatch) => {
  try {
    const response = await PostService.getFeedPosts();
    dispatch({
      type: postTypes.GET_FEED_POST_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err.msg || err.toString();
    console.log(message);
    dispatch({
      type: postTypes.GET_FEED_POST_ERROR,
      payload: message
    });
  }
}

export const getMyPosts = () => async (dispatch: Dispatch) => {
  try {
    const response = await PostService.getMyPosts();
    dispatch({
      type: postTypes.GET_MY_POSTS_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err.msg || err.toString();
    console.log(message);
    dispatch({
      type: postTypes.GET_MY_POSTS_ERROR,
      payload: message
    });
  }
}

export const createPost = (formData: PostT) => async (dispatch: Dispatch) => {
  try {
    const response = await PostService.onCreatePost(formData);
    dispatch({
      type: postTypes.CREATE_POST_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err.msg || err.toString();
    console.log(message);
    dispatch({
      type: postTypes.CREATE_POST_ERROR,
      payload: message
    });
  }
}

export const likePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await PostService.onLikePost(id);
    dispatch({
      type: postTypes.LIKE_FEED_POST_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString();
    console.log(message);
    dispatch({
      type: postTypes.LIKE_FEED_POST_ERROR,
      payload: message
    });
  }
}

export const dislikePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await PostService.onDislikePost(id);
    dispatch({
      type: postTypes.DISLIKE_FEED_POST_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString();
    console.log(message);
    dispatch({
      type: postTypes.DISLIKE_FEED_POST_ERROR,
      payload: message
    });
  }
}

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: postTypes.LOADING_POSTS });
    const response = await PostService.onDeletePost(id);
    dispatch({
      type: postTypes.DELETE_FEED_POST_SUCCESS,
      payload: response
    });
  } catch(err: any) {
    const message = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString();
    console.log(message);
    dispatch({
      type: postTypes.DELETE_FEED_POST_ERROR,
      payload: message
    });
  }
}