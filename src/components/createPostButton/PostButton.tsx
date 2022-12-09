import React, { FC } from 'react';
import { CreatePostContainer, Input } from './styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePostButton: FC<{ showModal: () => void }> = ({ showModal }) => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  return (
    <CreatePostContainer>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ width: 50 }}>
          <img src={user?.avatar?.url} alt="" width="600" height="400" className="img" onClick={() => navigate('/profile')} />
        </div>
        <Input placeholder="Whats on your mind?" onClick={() => showModal()} />
      </div>
    </CreatePostContainer>
  );
}

export default CreatePostButton;