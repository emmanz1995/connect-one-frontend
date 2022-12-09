import React, { useState } from 'react';
import PostButton from '../../components/createPostButton/PostButton';
import Master from '../../components/layout/master/Master';
import Post from '../../components/post/Post';
import CreatePost from '../../components/modals/CreatePost';

const Feed = () => {
  const [showHide, setShowHide] = useState(false);
  const showModal = () => setShowHide(true);
  const hideModal = () => setShowHide(false);
  return (
    <Master>
      <PostButton showModal={showModal} />
      <Post />
      {showHide && (
        <CreatePost hideModal={hideModal} />
      )}
    </Master>
  )
}

export default Feed