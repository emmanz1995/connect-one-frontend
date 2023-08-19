import React, { useEffect, useState } from 'react';
import { PostCard, Card } from './styles';
import { getPostFeed, likePost, dislikePost } from '../../redux/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisH, FaTrash, FaStar, FaRegStar, FaComment, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const Post = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.posts);
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    dispatch<any>(getPostFeed());
  }, [dispatch]);

  const handleLikePost = (id: string) => {
    dispatch<any>(likePost(id));
  }

  const handleDislikePost = (id: string) => {
    dispatch<any>(dislikePost(id));
  }
  return (
    <PostCard>
      {posts.map((post: any) => (
        <Card>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 50 }}>
                <img src={post?.postedBy?.avatar?.url} alt="" width="600" height="400" className="img" />
              </div>
              <div>
                <p className="p-name">{post?.postedBy?.name}</p>
                <p style={{ fontSize: 12 }}>1 minute ago</p>
              </div>
            </div>
            {post?.postedBy?.id?.includes(user?.id) && (
              <div>
                <FaEllipsisH />
              </div>
            )}
          </div>
          <div className="card-body">
            <div style={{ width: '100%', height: 365 }}>
              <img src={post?.image?.url} alt="" width="600" height="400" style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <p className="p-name">{post?.postedBy?.name}</p>
              <p>{post?.content}</p>
            </div>
          </div>
          <div className="card-footer">
            <div className="like-action">
              <p>{post?.likes?.length}</p> {post?.likes?.includes(user?.id) ? <FaStar className="icons" onClick={() => handleDislikePost(post?.id)} /> : <FaRegStar className="icons" onClick={() => handleLikePost(post?.id)} />}
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

export default Post;