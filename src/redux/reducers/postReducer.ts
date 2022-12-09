import { postTypes } from '../types';
import { TUser, PostT } from '../../utils/types';

interface IPost {
  id?: string;
  payload: PostT[];
  type: string;
}

const initialState = {
  posts: [],
  loading: false,
  error: ''
}

const postReducer = (state = initialState, action: { type: string, payload: IPost }) => {
  const { type, payload } = action;
  switch(type) {
    case postTypes.GET_MY_POSTS_SUCCESS:
    case postTypes.GET_FEED_POST_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case postTypes.GET_MY_POSTS_ERROR:
    case postTypes.GET_FEED_POST_ERROR:
      return {
        posts: [],
        loading: false,
        error: payload
      }
    case postTypes.CREATE_POST_SUCCESS:
      return {
        posts: [ ...state.posts, payload ]
      }
    case postTypes.CREATE_POST_ERROR:
      return {
        error: payload,
        loading: false
      }
    case postTypes.LIKE_FEED_POST_SUCCESS:
      return {
        posts: [
          ...state.posts.map((post: IPost) => {
            return post.id === payload.id ? { ...post, ...payload } : post;
          })
        ],
        loading: false
      }
    case postTypes.DISLIKE_FEED_POST_SUCCESS:
      return {
        posts: [
          ...state.posts.map((post: IPost) => {
            return post.id === payload.id ? { ...post, ...payload } : post;
          })
        ],
        loading: false
      }
    case postTypes.LIKE_FEED_POST_ERROR:
      return {
        error: payload,
        loading: false
      }
    case postTypes.DISLIKE_FEED_POST_ERROR:
      return {
        error: payload,
        loading: false
      }
    case postTypes.DELETE_FEED_POST_SUCCESS:
      return {
        posts: [
          ...state.posts.filter((post: IPost) => {
            return post.id !== payload.id;
          })
        ],
        loading: false
      }
    case postTypes.DELETE_FEED_POST_ERROR:
      return {
        error: payload,
        loading: false
      }
    default: return state;
  }
}

export default postReducer;