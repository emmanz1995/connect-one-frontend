import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPosts, likePost, dislikePost, deletePost } from '../../redux/actions/post';
import { FaEllipsisH, FaTrash, FaStar, FaRegStar, FaComment, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import styled from 'styled-components';
import moment from 'moment';

interface IState {
  auth: {
    isAuthenticated: boolean,
    user: any;
  };
  posts: {
    error: string;
    loading: boolean;
    posts: any[];
  };
  user: any[];
}

interface ICurrentUser {
  avatar: {publicId: string, url: string};
  id: string;
  token: string;
  username: string;
}

const ProfilePost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: IState) => state.posts);
  const { user, loading } = useSelector((state: any) => state.auth);

  const currentUser = JSON.parse(localStorage.getItem('user') as any);

  useEffect(() => {
    dispatch<any>(getMyPosts());
  }, [dispatch]);

  const handleLikePost = (id: string) => {
    dispatch<any>(likePost(id));
  }
  
  const handleDislikePost = (id: string) => {
    dispatch<any>(dislikePost(id));
  }

  const handleDeletePost = (id: string) => {
    dispatch<any>(deletePost(id));
  }

  return (
    <PostCard>
      {posts?.map((post: any) => (
        <Card key={post?.id}>
          <header className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 50 }}>
                <img src={post?.postedBy?.avatar?.url} alt="" width="600" height="400" className="img-profile" />
              </div>
              <div>
                <p className="p-name">{post.postedBy.name}</p>
                <p style={{ fontSize: 12 }}>{moment(post.createdAt).format('LL')}</p>
              </div>
            </div>
            <div>
              <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDeletePost(post.id)} />
            </div>
          </header>
          <div className="card-body">
            <div className="img">
              <img src={post?.image} alt="" width="600" height="400" className="img-post" />
            </div>
            <h3>{post?.content}</h3>
          </div>
          <div className="card-footer">
            <div className="like-action">
              <p>{post?.likes?.length}</p> {post?.likes?.includes(currentUser?.id) ? <FaStar size={20} style={{ cursor: 'pointer' }} onClick={() => handleDislikePost(post?.id)} /> : <FaRegStar style={{ cursor: 'pointer' }} size={20} onClick={() => handleLikePost(post?.id)} />}
            </div>
            <div className="comment-action">
              <p>{post?.comments?.length}</p><FaComment className="icons" />
            </div>
          </div>
        </Card>
      ))}
    </PostCard>
  )
}

export const PostCard = styled.div`
  width: 100%;
  // padding: 10px 60px;
`;
export const Card = styled.div`
  padding: 15px;
  width: 100%;
  margin: 15px auto;
  color: #fff;
  background-color: rgb(17 24 39 / 1);
  border-radius: 8px;
  .card-header {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    color: #F4F7FE;
    .p-name {
      font-weight: 800;
    }
    .img-profile {
      width: 100%;
      height: auto;
      border-radius: 100%;
    }
  }
  .card-body {
    color: #F4F7FE;
    margin: 20px 0;
  }
  .card-footer {
    display: flex;
    align-items: center;
    gap: 20px;
    .icons {
      color: #F4F7FE;
      cursor: pointer;
    }
    .like-action {
      color: #F4F7FE;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .comment-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #F4F7FE;
      gap: 5px;
      .comment-btn {
        background-color: #18191A;
        color: #F4F7FE;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }
  }
  .img {
    width: 100%;
    height: 365px;
    border-radius: 5px;
  }
  .img-post {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .p-name {
    font-weight: 800;
  }
`;

export default ProfilePost;