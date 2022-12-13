import React, { useState, useEffect } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Modal from './Modal';
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/post';
import axios from 'axios';
import Spinner from '../loading.../Spinner';

const CreatePost: React.FC<{ hideModal: () => void }> = ({ hideModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(url) {
      const formData = {
        image: url,
        content: content
      }
      if(content === '') {
        setMessage('Caption is required!');
      } else {
        dispatch<any>(createPost(formData));
        hideModal()
      }
    }
  }, [url, dispatch, content, hideModal]);

  const postDetails = (evt: any) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'connect-one');
    formData.append('cloud_name', 'emmanuel-cloud-storage');
    setLoading(true);
    axios.post('https://api.cloudinary.com/v1_1/emmanuel-cloud-storage/image/upload', formData)
      .then((response) => {
        setUrl(response?.data?.secure_url);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = (err.response && err.response.data && err.response.data.error && err.response.data.error.message) || err || err.error.message.toString();
        console.log(errorMessage);
        setLoading(false);
      })
  }

  const handleChangeImage = (evt: any) => {
    setImage(evt.target.files[0]);
  }

  return (
    <Modal onClick={(evt: any) => evt.stopPropagation()}>
      <CreatePostWrapper onSubmit={postDetails}>
        <CreatePostHeader>
          <h3>Create a new Post</h3>
          <FaWindowClose onClick={hideModal} />
        </CreatePostHeader>
        {message && <div>{message}</div>}
        <div style={{ margin: "15px 0" }}>
          <Input rows={5} cols={10} placeholder="Whats on your mind?" name="content" value={content} onChange={(evt) => setContent(evt.target.value)} />
        </div>
        <div style={{ margin: "15px 0" }}>
          <Image type="file" placeholder="Image" name="image" onChange={handleChangeImage} required />
        </div>
        <Button type='submit' disabled={loading}>{loading ? <Spinner /> : 'Create Post'}</Button>
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