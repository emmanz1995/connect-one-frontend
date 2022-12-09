import React, { useEffect } from 'react';
import { getProfile } from '../../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const ProfileHero = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch<any>(getProfile());
  }, [dispatch]);

  return (
    <Hero>
      <UserInfoSection>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 90 }}>
            <img
              src={currentUser?.avatar?.url}
              alt={currentUser?.username}
              style={{
                width: '100%',
                height: '100%',
                clipPath: 'circle(40% at 50% 50%)'
              }}
            />
          </div>
          <div>
            <h4>{currentUser?.name}</h4>
            <p>{currentUser?.username}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <p>{currentUser?.post?.length} Posts</p>
              <p>{currentUser?.follower?.length} Followers</p>
              <p>{currentUser?.following?.length} Following</p>
            </div>
            {/*<Button>Edit Info</Button>*/}
          </div>
        </div>
        {/*<FaTrash />*/}
      </UserInfoSection>
    </Hero>
  );
}

const Hero = styled.header`
  color: ${props => props.theme.light_color};
  width: 100%;
  background-color: rgb(17 24 39 / 1);
  border-radius: 8px;
  padding: 10px;
`;

const UserInfoSection = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px 25px;
  font-weight: 800;
  background-color: #816ffb;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #F4F7FE;
  margin: 5px 0;
`;

const HeroNav = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 10px;
  a {
    color: #F4F7FE;
    text-decoration: none;
  }
`;

export default ProfileHero;