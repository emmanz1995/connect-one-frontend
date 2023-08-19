import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import Modal from './Modal';
import { FaWindowClose } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../../redux/actions/post';
// import axios from 'axios';
import Spinner from '../loading.../Spinner';

const CreatePost: React.FC<{ hideModal: () => void }> = ({ hideModal }) => {

  const postDetails = (evt: any) => {
    evt.preventDefault()
  }

  const handleChangeImage = (evt: any) => {}

  return (
    <Modal onClick={(evt: any) => evt.stopPropagation()}>
      <CreatePostWrapper onSubmit={postDetails}>
        <CreatePostHeader>
          <h3>Create a new Post</h3>
          <FaWindowClose onClick={hideModal} />
        </CreatePostHeader>
        {/*{message && <div>{message}</div>}*/}
        <div style={{ margin: "15px 0" }}>
          <Input rows={5} cols={10} placeholder="Whats on your mind?" name="content" value={'content'} />
        </div>
        <div style={{ margin: "15px 0" }}>
          <Image type="file" placeholder="Image" name="image" onChange={handleChangeImage} required />
        </div>
        {/*<Button type='submit' disabled={loading}>{loading ? <Spinner /> : 'Create Post'}</Button>*/}
      </CreatePostWrapper>
    </Modal>
  );
}

const CreatePostWrapper: StyledComponent<"form", any> = styled.form``
const CreatePostHeader: StyledComponent<"div", any> = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #F4F7FE;
`
const Input = styled.textarea`
  border-radius: 8px;
  border: none;
  width: 100%;
  background-color: rgb(31 41 55 / 1);
  color: #F4F7FE;
  &:focus {
    outline: none;
  }
`;

const Image: StyledComponent<"input", any> = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  background-color: #F4F7FE;
  color: rgb(31 41 55 / 1);
`;

const Button: StyledComponent<"button", any> = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  background-color: rgb(17 24 39 / 1);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
`;

const ErrorMessage: StyledComponent<"span", any> = styled.span`
  color: rgb(248 113 113 / 1);
  font-size: 12px;
`;

export default CreatePost;